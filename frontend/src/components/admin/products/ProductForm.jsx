import Button from '../../shared/ui/Button'

function ProductForm({
  formData,
  loading,
  preview,
  submitText,
  onChange,
  onImageChange,
  onSubmit,
  onCancel,
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={formData.name}
        onChange={onChange}
        className="w-full rounded-2xl border border-rose-200 p-4 outline-none focus:border-rose-500"
        required
      />

      <select
        name="category"
        value={formData.category}
        onChange={onChange}
        className="w-full rounded-2xl border border-rose-200 p-4 outline-none focus:border-rose-500"
        required
      >
        <option value="">Select Category</option>
        <option value="Bouquet">Bouquet</option>
        <option value="Flower Pot">Flower Pot</option>
        <option value="Lamp">Lamp</option>
        <option value="Keychain">Keychain</option>
      </select>

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={onChange}
        className="w-full rounded-2xl border border-rose-200 p-4 outline-none focus:border-rose-500"
        required
      />

      <textarea
        name="description"
        rows="5"
        placeholder="Description"
        value={formData.description}
        onChange={onChange}
        className="w-full rounded-2xl border border-rose-200 p-4 outline-none focus:border-rose-500"
        required
      />

      <input
        type="file"
        accept="image/*"
        onChange={onImageChange}
        className="w-full rounded-2xl border border-rose-200 p-4"
      />

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="h-64 w-full rounded-2xl object-cover"
        />
      )}

      <div className="flex gap-4">
        <Button type="submit" disabled={loading}>
          {loading ? 'Please wait...' : submitText}
        </Button>

        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}

export default ProductForm  