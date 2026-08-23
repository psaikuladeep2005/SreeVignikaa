"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Sparkles,
  Upload,
  X,
  Check,
  AlertCircle,
  Eye,
  ShieldCheck,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ProductWithImages, Category, ProductImage } from "@/lib/types";
import {
  getProducts,
  getCategories,
  saveProduct,
  deleteProduct,
  uploadProductImageFile,
} from "@/lib/api";
import { formatINR, slugify } from "@/lib/utils";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductWithImages[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");
  const [loading, setLoading] = useState(true);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<ProductWithImages> | null>(null);
  const [imagesList, setImagesList] = useState<Partial<ProductImage>[]>([]);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [uploadingImg, setUploadingImg] = useState(false);
  const [saving, setSaving] = useState(false);

  // Delete Confirm Modal State
  const [deleteId, setDeleteId] = useState<string | null>(null);

  async function loadCatalog() {
    setLoading(true);
    const [p, c] = await Promise.all([getProducts(), getCategories(true)]);
    setProducts(p);
    setCategories(c);
    setLoading(false);
  }

  useEffect(() => {
    loadCatalog();
  }, []);

  const handleOpenAdd = () => {
    setEditingProduct({
      product_code: `SD-${Date.now().toString().slice(-4)}`,
      name: "",
      slug: "",
      description: "",
      price: null,
      is_price_visible: true,
      category_id: categories[0]?.id || "",
      fabric: "Pure Kanchipuram Silk",
      work_type: "Zari Border",
      color: "Navy & Gold",
      care_instructions: "Dry clean only.",
      is_featured: false,
      is_available: true,
    });
    setImagesList([
      {
        image_url:
          "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1000",
        is_primary: true,
        sort_order: 1,
      },
    ]);
    setModalOpen(true);
  };

  const handleOpenEdit = (p: ProductWithImages) => {
    setEditingProduct({ ...p });
    setImagesList(
      p.images && p.images.length > 0
        ? [...p.images]
        : [
            {
              image_url:
                "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1000",
              is_primary: true,
              sort_order: 1,
            },
          ]
    );
    setModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImg(true);
    try {
      const url = await uploadProductImageFile(file);
      const newImg: Partial<ProductImage> = {
        id: `img-${Date.now()}`,
        image_url: url,
        is_primary: imagesList.length === 0,
        sort_order: imagesList.length + 1,
      };
      setImagesList((prev) => [...prev, newImg]);
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setUploadingImg(false);
    }
  };

  const handleAddImageUrl = () => {
    if (!newImageUrl.trim()) return;
    const newImg: Partial<ProductImage> = {
      id: `img-${Date.now()}`,
      image_url: newImageUrl.trim(),
      is_primary: imagesList.length === 0,
      sort_order: imagesList.length + 1,
    };
    setImagesList((prev) => [...prev, newImg]);
    setNewImageUrl("");
  };

  const handleRemoveImage = (idx: number) => {
    const updated = imagesList.filter((_, i) => i !== idx);
    // ensure at least one is primary
    if (updated.length > 0 && !updated.some((img) => img.is_primary)) {
      updated[0].is_primary = true;
    }
    setImagesList(updated);
  };

  const handleSetPrimary = (idx: number) => {
    const updated = imagesList.map((img, i) => ({
      ...img,
      is_primary: i === idx,
    }));
    setImagesList(updated);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct || !editingProduct.name) return;
    setSaving(true);

    const slug =
      editingProduct.slug && editingProduct.slug.trim() !== ""
        ? editingProduct.slug
        : slugify(editingProduct.name);

    await saveProduct({ ...editingProduct, slug }, imagesList);
    await loadCatalog();
    setSaving(false);
    setModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    await deleteProduct(deleteId);
    await loadCatalog();
    setDeleteId(null);
  };

  const filteredProducts = products.filter((p) => {
    if (selectedCat !== "all" && p.category_id !== selectedCat) return false;
    if (search.trim() !== "") {
      const q = search.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.product_code.toLowerCase().includes(q) ||
        p.work_type.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-maroon-950">
            Product Catalog Manager
          </h1>
          <p className="text-xs sm:text-sm text-maroon-800/70">
            Add, edit, or remove sarees, dresses and ethnic wear from your live website.
          </p>
        </div>

        <Button
          onClick={handleOpenAdd}
          className="w-full sm:w-auto gap-2 bg-maroon-900 text-gold-100 hover:bg-maroon-800 font-bold shadow-lg py-5"
        >
          <Plus className="h-5 w-5" />
          <span>Add New Product</span>
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-gold-300/40 bg-white p-4 shadow-sm">
        <div className="relative w-full sm:w-2/3">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-maroon-800/40" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, SKU code (e.g. SS-2026-101), fabric or work..."
            className="pl-10 bg-champagne-50/50"
          />
        </div>

        <select
          value={selectedCat}
          onChange={(e) => setSelectedCat(e.target.value)}
          className="w-full sm:w-auto rounded-lg border border-maroon-900/20 bg-champagne-50/50 px-4 py-2 text-xs font-semibold text-maroon-950 focus:border-gold-500 focus:outline-none"
        >
          <option value="all">All Categories ({products.length})</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Products Table / Grid */}
      <div className="rounded-2xl border border-gold-300/40 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-champagne-100/60 text-maroon-900 font-semibold border-b border-gold-300/30">
              <tr>
                <th className="p-4">Design Image</th>
                <th className="p-4">SKU / Code</th>
                <th className="p-4">Creation Details</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold-300/20">
              {filteredProducts.map((p) => {
                const img =
                  p.images?.find((i) => i.is_primary)?.image_url ||
                  p.images?.[0]?.image_url ||
                  "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=200";

                return (
                  <tr key={p.id} className="hover:bg-champagne-50/50 transition-colors">
                    <td className="p-4">
                      <div className="relative h-14 w-14 overflow-hidden rounded-lg border border-gold-300/40 bg-champagne-200">
                        <Image
                          src={img}
                          alt={p.name}
                          fill
                          className="object-cover object-top"
                        />
                      </div>
                    </td>
                    <td className="p-4 font-mono font-bold text-gold-700">
                      {p.product_code}
                    </td>
                    <td className="p-4">
                      <div className="font-serif font-bold text-maroon-950 max-w-xs line-clamp-1">
                        {p.name}
                      </div>
                      <div className="text-[11px] text-maroon-800/70 mt-0.5">
                        {p.work_type} &bull; {p.fabric}
                      </div>
                    </td>
                    <td className="p-4 text-maroon-900/80">
                      {p.category?.name || "Collection"}
                    </td>
                    <td className="p-4 font-semibold text-maroon-950">
                      {formatINR(p.price, p.is_price_visible)}
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1 items-start">
                        {p.is_available ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-800">
                            <ShieldCheck className="h-3 w-3" /> Available
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 text-[10px] font-semibold text-red-800">
                            Unavailable
                          </span>
                        )}
                        {p.is_featured && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-semibold text-amber-800">
                            <Star className="h-3 w-3 fill-amber-700" /> Featured
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenEdit(p)}
                          className="h-8 px-2.5 text-xs text-maroon-900 border-maroon-900/20 hover:bg-champagne-200"
                        >
                          <Edit2 className="h-3.5 w-3.5 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => setDeleteId(p.id)}
                          className="h-8 px-2 text-xs"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {modalOpen && editingProduct && (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 bg-champagne-50 border-gold-400/40">
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl font-bold text-maroon-950">
                {editingProduct.id ? "Edit Product" : "Add New Product"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSaveProduct} className="space-y-6 mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">SKU / Product Code</Label>
                  <Input
                    value={editingProduct.product_code || ""}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, product_code: e.target.value })
                    }
                    placeholder="e.g. SS-2026-101"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Category</Label>
                  <select
                    value={editingProduct.category_id || categories[0]?.id}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, category_id: e.target.value })
                    }
                    className="w-full h-10 rounded-md border border-maroon-900/20 bg-champagne-50 px-3 text-sm font-medium text-maroon-950 focus:border-gold-500 focus:outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Design Name</Label>
                  <Input
                    value={editingProduct.name || ""}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, name: e.target.value })
                    }
                    placeholder="e.g. Royal Kanchipuram Silk Saree"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">URL Slug (Optional)</Label>
                  <Input
                    value={editingProduct.slug || ""}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, slug: e.target.value })
                    }
                    placeholder="royal-kanchipuram-silk-saree"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Price (INR ₹)</Label>
                  <Input
                    type="number"
                    value={editingProduct.price || ""}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        price: e.target.value ? Number(e.target.value) : null,
                      })
                    }
                    placeholder="14500"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Fabric Specification</Label>
                  <Input
                    value={editingProduct.fabric || ""}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, fabric: e.target.value })
                    }
                    placeholder="Pure Kanchipuram Silk"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Work Type</Label>
                  <Input
                    value={editingProduct.work_type || ""}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, work_type: e.target.value })
                    }
                    placeholder="Zari Work"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Color Palette</Label>
                  <Input
                    value={editingProduct.color || ""}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, color: e.target.value })
                    }
                    placeholder="Maroon & Antique Gold"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Care Instructions</Label>
                  <Input
                    value={editingProduct.care_instructions || ""}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        care_instructions: e.target.value,
                      })
                    }
                    placeholder="Dry clean only"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Description</Label>
                <Textarea
                  value={editingProduct.description || ""}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, description: e.target.value })
                  }
                  placeholder="Detailed description of the fabric, work, and outfit details..."
                  className="min-h-[100px]"
                />
              </div>

              {/* Status Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl border border-gold-300/40 bg-champagne-100/50">
                <div className="flex items-center justify-between">
                  <Label htmlFor="featured-switch" className="text-xs font-semibold">
                    Featured Item
                  </Label>
                  <Switch
                    id="featured-switch"
                    checked={editingProduct.is_featured || false}
                    onCheckedChange={(c) =>
                      setEditingProduct({ ...editingProduct, is_featured: c })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="available-switch" className="text-xs font-semibold">
                    In Stock / Available
                  </Label>
                  <Switch
                    id="available-switch"
                    checked={editingProduct.is_available ?? true}
                    onCheckedChange={(c) =>
                      setEditingProduct({ ...editingProduct, is_available: c })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="price-vis-switch" className="text-xs font-semibold">
                    Show Price on Site
                  </Label>
                  <Switch
                    id="price-vis-switch"
                    checked={editingProduct.is_price_visible ?? true}
                    onCheckedChange={(c) =>
                      setEditingProduct({ ...editingProduct, is_price_visible: c })
                    }
                  />
                </div>
              </div>

              {/* Multi-Image Uploader Section */}
              <div className="space-y-3 pt-2 border-t border-gold-300/30">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-serif font-bold text-maroon-950">
                    Design Image Gallery ({imagesList.length})
                  </Label>
                  <span className="text-xs text-maroon-800/70">
                    Upload image files or paste image URLs
                  </span>
                </div>

                <div className="flex flex-wrap gap-3">
                  {imagesList.map((img, idx) => (
                    <div
                      key={idx}
                      className={`relative group h-24 w-24 rounded-xl border-2 overflow-hidden bg-champagne-200 ${
                        img.is_primary ? "border-maroon-900 ring-2 ring-maroon-900/20" : "border-gold-300/50"
                      }`}
                    >
                      <Image
                        src={img.image_url || ""}
                        alt={`Image ${idx + 1}`}
                        fill
                        className="object-cover object-top"
                      />
                      {img.is_primary && (
                        <span className="absolute bottom-0 inset-x-0 bg-maroon-900 text-gold-100 text-[10px] font-bold text-center py-0.5">
                          Primary
                        </span>
                      )}

                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 p-1">
                        {!img.is_primary && (
                          <button
                            type="button"
                            onClick={() => handleSetPrimary(idx)}
                            className="text-[10px] bg-white text-maroon-950 px-1.5 py-0.5 rounded font-bold hover:bg-gold-300"
                          >
                            Set Primary
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="text-[10px] bg-red-600 text-white px-1.5 py-0.5 rounded font-bold hover:bg-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Upload button */}
                  <label className="h-24 w-24 rounded-xl border-2 border-dashed border-maroon-900/30 flex flex-col items-center justify-center cursor-pointer bg-white/70 hover:bg-champagne-100 transition-colors text-maroon-900">
                    <Upload className="h-5 w-5 mb-1" />
                    <span className="text-[10px] font-semibold text-center">
                      {uploadingImg ? "Uploading..." : "Upload File"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Input
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="Or paste image URL (https://images.unsplash.com/...)"
                    className="text-xs"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddImageUrl}
                    className="shrink-0 text-xs font-semibold"
                  >
                    Add URL
                  </Button>
                </div>
              </div>

              <DialogFooter className="pt-4 border-t border-gold-300/30">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={saving}
                  className="bg-maroon-900 text-gold-100 hover:bg-maroon-800 font-bold px-8"
                >
                  {saving ? "Saving Product..." : "Save Product"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <Dialog open={Boolean(deleteId)} onOpenChange={() => setDeleteId(null)}>
          <DialogContent className="max-w-md p-6 bg-champagne-50 border-gold-400/40 text-center">
            <DialogHeader>
              <DialogTitle className="font-serif text-xl font-bold text-maroon-950">
                Confirm Deletion
              </DialogTitle>
            </DialogHeader>
            <p className="text-sm text-maroon-800/80 my-4">
              Are you sure you want to delete this product from your catalog? This action cannot be undone.
            </p>
            <DialogFooter className="flex justify-center gap-3">
              <Button variant="outline" onClick={() => setDeleteId(null)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleConfirmDelete}>
                Yes, Delete Design
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
