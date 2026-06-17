import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import Button from "../common/Button";

export default function SearchForm({ onSearch, isSearching }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      query: "",
    },
  });

  return (
    <form
      className="space-y-3"
      onSubmit={handleSubmit(({ query }) => onSearch(query.trim()))}
    >
      <div>
        <label
          htmlFor="research-question"
          className="text-sm font-semibold text-slate-800"
        >
          Research Question
        </label>
        <textarea
          id="research-question"
          rows={4}
          placeholder="Example: retrieval augmented generation hallucination reduction"
          className="mt-2 w-full resize-none rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400"
          {...register("query", {
            required: "Enter a research question before searching.",
            minLength: {
              value: 3,
              message: "Use at least 3 characters.",
            },
          })}
        />
        {errors.query && (
          <p className="mt-1 text-xs text-rose-700">{errors.query.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSearching} className="w-full">
        <Search className="h-4 w-4" aria-hidden="true" />
        {isSearching ? "Searching" : "Search Papers"}
      </Button>
    </form>
  );
}
