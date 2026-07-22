import { Save, Loader2 } from 'lucide-react'

function SaveSettings({ saving, onSave }) {
  return (
    <div className="sticky bottom-6 flex justify-end">
      <button
        type="button"
        onClick={onSave}
        disabled={saving}
        className="flex items-center gap-2 rounded-xl bg-rose-500 px-6 py-3 font-medium text-white shadow-lg transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {saving ? (
          <>
            <Loader2
              size={18}
              className="animate-spin"
            />
            Saving...
          </>
        ) : (
          <>
            <Save size={18} />
            Save Changes
          </>
        )}
      </button>
    </div>
  )
}

export default SaveSettings