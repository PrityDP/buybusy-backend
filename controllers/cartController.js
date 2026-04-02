import CartItem from "../models/cartModel.js";

class CartController {

    // get Cart
    getCart = async (req, res) => {
        try {
            const cart = await CartItem.findOne({ user: req.user.id }).populate("items.product");
            return res.json(cart || { items: [] });
        }
        catch (error) {
            res.status(500).json({ message: "Error fetching cart", error: error.message });
        }
    }

    // Add to cart
    addToCart = async (req, res) => {
        try {
            const { productId, qty } = req.body;
            let cart = await CartItem.findOne({ user: req.user.id });

            if (!cart) {
                cart = new CartItem({ user: req.user.id, items: [{ product: productId, qty }] });
            } else {
                const itemIndex = cart.items.findIndex(item => item.product.toString() === productId.toString());

                if (itemIndex !== -1) {
                    cart.items[itemIndex].qty = (cart.items[itemIndex].qty || 0) + qty;
                } else {
                    cart.items.push({ product: productId, qty });
                }
            }

            await cart.save();
            // Populate product details before sending response
            await cart.populate("items.product");

            return res.json({ message: "Item added to cart", cart });

        } catch (error) {
            res.status(500).json({ message: "Error adding to cart", error: error.message });
        }
    };

    // Remove from cart
    removeFromCart = async (req, res) => {
        try {
            const { productId } = req.params;
            const cart = await CartItem.findOne({ user: req.user.id });
            if (!cart) return res.status(404).json({ message: "Cart not found" });

            cart.items = cart.items.filter(item => item.product.toString() !== productId);
            await cart.save();

            res.json({ message: "Item removed", cart });
        } catch (error) {
            res.status(500).json({ message: "Error removing item", error: error.message });
        }
    };

    // Update cart item quantity
    updateCart = async (req, res) => {
        try {
            const { productId } = req.params;
            const { qty } = req.body;

            const cart = await CartItem.findOne({ user: req.user.id });

            if (!cart) {
                return res.status(404).json({ message: "Cart not found" });
            }

            const itemIndex = cart.items.findIndex(
                item => item.product.toString() === productId
            );

            if (itemIndex === -1) {
                return res.status(404).json({ message: "Item not found in cart" });
            }

            // ✅ Update qty OR remove if 0
            if (qty <= 0) {
                cart.items.splice(itemIndex, 1);
            } else {
                cart.items[itemIndex].qty = qty;
            }

            await cart.save();
            await cart.populate("items.product");

            return res.json({ message: "Cart updated", cart });

        } catch (error) {
            res.status(500).json({ message: "Error updating cart", error: error.message });
        }
    };
}
export default CartController;
