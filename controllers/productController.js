import ProductModel from "../models/productModel.js";

// Product Controller (Search + Filter + Pagination)
class ProductController {

    // GET All products
    getProducts = async (req, res) => {
        try {
            //Data coming from URL like - /api/products?search=phone&category=electronics&page=2
            // page - pagination page, limit - items per page
            const { search = "", category, minPrice, maxPrice, page = 1, limit = 10 } = req.query;

            const query = {};

            // MongoDB regex: $regex → search pattern  $options: "i" → case-insensitive 
            // Example search = "phone" matches: iPhone, Phone, PHONE
            // Apply search ONLY if exists
            if (search && search.length > 1) {
                query.title = { $regex: search, $options: "i" };
            }
            if (minPrice || maxPrice) {
                query.price = {};
                if (minPrice) {
                    query.price.$gte = Number(minPrice);
                }
                if (maxPrice) {
                    query.price.$lte = Number(maxPrice);
                }
            }

            const skip = (page - 1) * limit; // Example: Page 1 skip 0, page 2 ship 10 page 3 skip 20

            const products = await ProductModel.find(query).skip(skip).limit(Number(limit));

            // Needed for pagination UI: total pages, page numbers
            const total = await ProductModel.countDocuments(query);

            return res.json({ products, total, page: Number(page), pages: Math.ceil(total / limit) });

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

    // Add products
    addProduct = async (req, res) => {
        try {
            const { title, description, price, category, image } = req.body;
            const newProduct = new ProductModel({ title, description, price, category, image });
            await newProduct.save();
            return res.status(201).json({ message: "Product added.", product: newProduct });

        }
        catch (error) {
            return res.status(500).json({ message: "Error adding product", error: error.message });
        }
    }

    // Get single product
    getProductById = async (req, res) => {
        try {
            const { id } = req.params;
            const p = await ProductModel.findById(id);
            if (!p) {
                return res.status(404).json({ message: "Product not found." })
            }
            return res.status(200).json({ message: "Product recived by id", productById: p })

        } catch (error) {
            return res.status(500).json({ message: "Error while fetching product by Id", error: error.message });
        }

    }
    // update product
    // Update product
    updateProduct = async (req, res) => {
        try {
            const { id } = req.params;
            const { title, description, price, category, image } = req.body;

            const updatedProduct = await ProductModel.findByIdAndUpdate(
                id,
                { title, description, price, category, image },
                { new: true } // return updated doc
            );

            if (!updatedProduct) {
                return res.status(404).json({ message: "Product not found" });
            }

            return res.json({
                message: "Product updated successfully",
                product: updatedProduct
            });

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

    // Delete product
    deleteProduct = async (req, res) => {
        try {
            const { id } = req.params;

            const deleted = await ProductModel.findByIdAndDelete(id);

            if (!deleted) {
                return res.status(404).json({ message: "Product not found" });
            }

            return res.json({
                message: "Product deleted successfully"
            });

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };
}

export default ProductController;
