"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Plus,
  Edit2,
  Trash2,
  Layers,
  Sparkles,
  Check,
  X,
  Upload,
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
import { Category } from "@/lib/types";
import { getCategories, saveCategory, deleteCategory, uploadProductImageFile } from "@/lib/api";
import { slugify } from "@/lib/utils";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState<Partial<Category> | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  async function loadCats() {
    setLoading(true);
    const data = await getCategories(true);
    setCategories(data);
    setLoading(false);
  }

  useEffect(() => {
    loadCats();
  }, []);

  const handleOpenAdd = () => {
    setEditingCat({
      name: "",
      slug: "",
      description: "",
      image_url:
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800",
      sort_order: categories.length + 1,
      is_active: true,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (c: Category) => {
    setEditingCat({ ...c });
    setModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingCat) return;
    try {
      const url = await uploadProductImageFile(file);
      setEditingCat({ ...editingCat, image_url: url });
    } catch (err) {
      console.error("Image upload error:", err);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCat || !editingCat.name) return;
    setSaving(true);
    const slug =
      editingCat.slug && editingCat.slug.trim() !== ""
        ? editingCat.slug
        : slugify(editingCat.name);

    await saveCategory({ ...editingCat, slug });
    await loadCats();
    setSaving(false);
    setModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    await deleteCategory(deleteId);
    await loadCats();
    setDeleteId(null);
  };

  return (
    <div className="space-y-8">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-maroon-950">
            Category Manager
          </h1>
          <p className="text-xs sm:text-sm text-maroon-800/70">
            Organize your boutique specialties and navigation tabs.
          </p>
        </div>

        <Button
          onClick={handleOpenAdd}
          className="w-full sm:w-auto gap-2 bg-maroon-900 text-gold-100 hover:bg-maroon-800 font-bold shadow-lg py-5"
        >
          <Plus className="h-5 w-5" />
          <span>Add New Category</span>
        </Button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((c) => (
          <div
            key={c.id}
            className="group rounded-2xl border border-gold-300/40 bg-white shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between"
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-champagne-200">
              <Image
                src={c.image_url || ""}
                alt={c.name}
                fill
                className="object-cover object-top"
              />
              <div className="absolute top-3 right-3">
                <span
                  className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                    c.is_active
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {c.is_active ? "Active" : "Hidden"}
                </span>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-gold-700 block mb-0.5">
                  Order: #{c.sort_order} &bull; Slug: {c.slug}
                </span>
                <h3 className="font-serif text-xl font-bold text-maroon-950 mb-1.5">
                  {c.name}
                </h3>
                <p className="text-xs text-maroon-800/75 leading-relaxed line-clamp-2">
                  {c.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gold-300/20 flex items-center justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenEdit(c)}
                  className="h-8 px-3 text-xs text-maroon-900"
                >
                  <Edit2 className="h-3.5 w-3.5 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setDeleteId(c.id)}
                  className="h-8 px-2 text-xs"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Category Modal */}
      {modalOpen && editingCat && (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="max-w-lg p-6 bg-champagne-50 border-gold-400/40">
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl font-bold text-maroon-950">
                {editingCat.id ? "Edit Category" : "Add New Category"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSave} className="space-y-4 mt-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Category Name</Label>
                <Input
                  value={editingCat.name || ""}
                  onChange={(e) =>
                    setEditingCat({ ...editingCat, name: e.target.value })
                  }
                  placeholder="e.g. Silk Sarees"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">URL Slug</Label>
                  <Input
                    value={editingCat.slug || ""}
                    onChange={(e) =>
                      setEditingCat({ ...editingCat, slug: e.target.value })
                    }
                    placeholder="silk-sarees"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Display Sort Order</Label>
                  <Input
                    type="number"
                    value={editingCat.sort_order ?? 1}
                    onChange={(e) =>
                      setEditingCat({
                        ...editingCat,
                        sort_order: Number(e.target.value),
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Description</Label>
                <Textarea
                  value={editingCat.description || ""}
                  onChange={(e) =>
                    setEditingCat({ ...editingCat, description: e.target.value })
                  }
                  placeholder="Short explanation of designs included in this category..."
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Category Banner Image URL</Label>
                <div className="flex gap-2">
                  <Input
                    value={editingCat.image_url || ""}
                    onChange={(e) =>
                      setEditingCat({ ...editingCat, image_url: e.target.value })
                    }
                    placeholder="https://images.unsplash.com/..."
                  />
                  <label className="shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-md border border-maroon-900/30 bg-white text-xs font-semibold text-maroon-900 cursor-pointer hover:bg-champagne-100">
                    <Upload className="h-4 w-4" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl border border-gold-300/40 bg-champagne-100/50">
                <Label htmlFor="cat-active" className="text-xs font-semibold">
                  Active &amp; Visible on Website
                </Label>
                <Switch
                  id="cat-active"
                  checked={editingCat.is_active ?? true}
                  onCheckedChange={(c) =>
                    setEditingCat({ ...editingCat, is_active: c })
                  }
                />
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
                  {saving ? "Saving..." : "Save Category"}
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
                Confirm Category Deletion
              </DialogTitle>
            </DialogHeader>
            <p className="text-sm text-maroon-800/80 my-4">
              Are you sure you want to delete this category? Products linked to this category will not be deleted.
            </p>
            <DialogFooter className="flex justify-center gap-3">
              <Button variant="outline" onClick={() => setDeleteId(null)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleConfirmDelete}>
                Yes, Delete Category
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
