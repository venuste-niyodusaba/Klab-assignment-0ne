import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import axios, { type AxiosResponse } from "axios";
import { Edit2, CheckCircle, Slash, Plus } from "lucide-react";
import { Notify } from "notiflix";

interface CategoryType { _id: string; name: string; }
interface ProductType {
  _id: string;
  name: string;
  description?: string;
  price: number;
  status: "inStock" | "ordered" | "other";
  sizes?: string[];
  colors?: string[];
  category?: CategoryType;
  isActive: boolean;
  images?: string[];
}
interface NewProductForm {
  name: string; description: string; price: string; status: "inStock" | "ordered" | "other";
  sizes: string; colors: string; category: string; isActive: boolean; images: string;
}

export function Product() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductType | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [newProduct, setNewProduct] = useState<NewProductForm>({
    name: "", description: "", price: "", status: "inStock", sizes: "",
    colors: "", category: "", isActive: true, images: ""
  });

  const token = localStorage.getItem("token") || "";

  const fetchProducts = async () => {
    try {
      const [productsRes, categoriesRes]: [AxiosResponse<ProductType[]>, AxiosResponse<CategoryType[]>] = 
        await Promise.all([
          axios.get<ProductType[]>("https://kappee-backend-repo-10.onrender.com/api/products", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get<CategoryType[]>("https://kappee-backend-repo-10.onrender.com/api/categories", { headers: { Authorization: `Bearer ${token}` } })
        ]);
      setProducts(productsRes.data || []);
      setCategories(categoriesRes.data || []);
    } catch (err) {
      console.error(err); Notify.failure("Failed to load products or categories.");
    } finally { setLoading(false); }
  };

  useEffect(() => {
    fetchProducts();
    const interval = setInterval(fetchProducts, 20000);
    return () => clearInterval(interval);
  }, []);

  const resetForm = () => {
    setNewProduct({ name: "", description: "", price: "", status: "inStock", sizes: "", colors: "", category: "", isActive: true, images: "" });
    setEditingProduct(null); setImageFile(null); setShowForm(false);
  };

  const handleEdit = (product: ProductType) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name, description: product.description || "", price: product.price.toString(),
      status: product.status, sizes: product.sizes?.join(", ") || "", colors: product.colors?.join(", ") || "",
      category: product.category?._id || "", isActive: product.isActive, images: product.images?.join(", ") || ""
    });
    setShowForm(true);
  };

  const handleToggleActive = async (product: ProductType) => {
    try {
      const res: AxiosResponse<ProductType> = await axios.patch(
        `https://kappee-backend-repo-10.onrender.com/api/products/${product._id}`,
        { isActive: !product.isActive },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProducts(products.map((p) => (p._id === res.data._id ? res.data : p)));
      Notify.success(`Product "${res.data.name}" ${res.data.isActive ? "activated" : "deactivated"}`);
    } catch (err: any) { console.error(err); Notify.failure(err.response?.data?.message || "Error updating product"); }
  };

  const handleSaveProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const payload: any = { ...newProduct, price: parseFloat(newProduct.price), 
        sizes: newProduct.sizes.split(",").map((s) => s.trim()).filter(Boolean),
        colors: newProduct.colors.split(",").map((c) => c.trim()).filter(Boolean),
        images: newProduct.images.split(",").map((i) => i.trim()).filter(Boolean),
      };
      let headers: Record<string,string> = { Authorization: `Bearer ${token}` };
      let dataToSend: any = payload;

      if (imageFile) {
        const formData = new FormData();
        Object.entries(payload).forEach(([k,v]) => Array.isArray(v) ? v.forEach(i => formData.append(k,i)) : formData.append(k,v as string|Blob));
        formData.append("imageFile", imageFile);
        dataToSend = formData; headers["Content-Type"] = "multipart/form-data";
      }

      let res: AxiosResponse<ProductType>;
      if (editingProduct) {
        res = await axios.patch(`https://kappee-backend-repo-10.onrender.com/api/products/${editingProduct._id}`, dataToSend, { headers });
        setProducts(products.map((p) => (p._id === res.data._id ? res.data : p)));
        Notify.success("Product updated successfully");
      } else {
        res = await axios.post("https://kappee-backend-repo-10.onrender.com/api/products", dataToSend, { headers });
        setProducts([...products, res.data]);
        Notify.success("Product created successfully");
      }
      resetForm();
    } catch (err: any) { console.error(err); Notify.failure(err.response?.data?.message || "Error saving product"); }
  };

  if (loading) return <p className="p-4">Loading products...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 flex justify-between items-center">
        Products
        <button onClick={() => setShowForm(true)} className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-black flex items-center gap-2">
          <Plus size={16} /> Add Product
        </button>
      </h1>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded shadow-lg p-6 w-full max-w-2xl overflow-auto max-h-[90vh]">
            <h2 className="text-xl font-bold mb-4">{editingProduct ? "Edit Product" : "Add Product"}</h2>
            <form onSubmit={handleSaveProduct} className="flex flex-col gap-3">
              <input type="text" placeholder="Name" value={newProduct.name} required
                onChange={(e)=>setNewProduct({...newProduct,name:e.target.value})} className="border p-2 rounded"/>
              <input type="text" placeholder="Description" value={newProduct.description}
                onChange={(e)=>setNewProduct({...newProduct,description:e.target.value})} className="border p-2 rounded"/>
              <input type="number" placeholder="Price" value={newProduct.price} required
                onChange={(e)=>setNewProduct({...newProduct,price:e.target.value})} className="border p-2 rounded"/>
              <select value={newProduct.status} onChange={(e)=>setNewProduct({...newProduct,status:e.target.value as any})} className="border p-2 rounded">
                <option value="inStock">In Stock</option>
                <option value="ordered">Ordered</option>
                <option value="other">Other</option>
              </select>
              <input type="text" placeholder="Sizes (comma separated)" value={newProduct.sizes} onChange={(e)=>setNewProduct({...newProduct,sizes:e.target.value})} className="border p-2 rounded"/>
              <input type="text" placeholder="Colors (comma separated)" value={newProduct.colors} onChange={(e)=>setNewProduct({...newProduct,colors:e.target.value})} className="border p-2 rounded"/>
              <input type="text" placeholder="Image URLs (comma separated)" value={newProduct.images} onChange={(e)=>setNewProduct({...newProduct,images:e.target.value})} className="border p-2 rounded"/>
              <input type="file" accept="image/*" onChange={(e: ChangeEvent<HTMLInputElement>) => setImageFile(e.target.files?.[0] || null)} className="border p-2 rounded"/>
              <select value={newProduct.category} required onChange={(e)=>setNewProduct({...newProduct,category:e.target.value})} className="border p-2 rounded">
                <option value="">Select Category</option>
                {categories.map((cat)=><option key={cat._id} value={cat._id}>{cat.name}</option>)}
              </select>
              <label className="flex items-center gap-2"><input type="checkbox" checked={newProduct.isActive} onChange={(e)=>setNewProduct({...newProduct,isActive:e.target.checked})}/> Active</label>
              <div className="flex justify-end gap-3 mt-4">
                <button type="button" onClick={resetForm} className="px-6 py-2 border rounded">Cancel</button>
                <button type="submit" className="bg-yellow-400 text-white px-12 py-2 rounded hover:bg-black">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Desktop Table */}
      <div className="hidden md:block">
        <table className="w-full border mt-4">
          <thead><tr className="bg-gray-100">
            <th className="border p-2">Image</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Active</th>
            <th className="border p-2">Actions</th>
          </tr></thead>
          <tbody>
            {products.map((p)=>(
              <tr key={p._id}>
                <td className="border p-2">{p.images?.[0] ? <img src={p.images[0]} alt={p.name} className="w-16 h-16 object-cover rounded"/> : "-"}</td>
                <td className="border p-2">{p.name}</td>
                <td className="border p-2">{p.price} Frw</td>
                <td className="border p-2">{p.category?.name || "-"}</td>
                <td className="border p-2 capitalize">{p.status || "instock"}</td>
                <td className="border p-2 cursor-pointer" onClick={()=>handleToggleActive(p)}>
                  {p.isActive ? <CheckCircle size={18} className="text-green-500"/> : <Slash size={18} className="text-red-500"/>}
                </td>
                <td className="border p-2"><button onClick={()=>handleEdit(p)} className="p-1 border rounded hover:bg-gray-200"><Edit2 size={16}/></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col gap-4 mt-4">
        {products.map(p=>(
          <div key={p._id} className="bg-white shadow rounded-lg border p-4 flex flex-col gap-2">
            {p.images?.[0] && <img src={p.images[0]} alt={p.name} className="w-full h-40 object-cover rounded"/>}
            <div className="flex justify-between font-semibold text-lg">{p.name} <span>{p.price} Frw</span></div>
            <div>Category: {p.category?.name || "-"}</div>
            <div>Status: <span className="capitalize">{p.status}</span></div>
            <div className="flex items-center gap-2">Active: 
              <span className="cursor-pointer" onClick={()=>handleToggleActive(p)}>
                {p.isActive ? <CheckCircle size={18} className="text-green-500"/> : <Slash size={18} className="text-red-500"/>}
              </span>
            </div>
            <button onClick={()=>handleEdit(p)} className="mt-2 bg-gray-200 px-3 py-1 rounded flex items-center gap-1"><Edit2 size={16}/> Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
}
