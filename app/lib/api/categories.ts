import { baseAPI } from "@/app/lib/utils";
import { Status } from "./status";

export interface Category {
  id: number;
  name: string;
  status?: Status;
}

function unwrapList<T>(payload: unknown): T[] {
  if (Array.isArray(payload)) return payload;
  if (payload && typeof payload === "object") {
    const obj = payload as Record<string, unknown>;
    if (Array.isArray(obj.data)) return obj.data as T[];
    if (Array.isArray(obj.result)) return obj.result as T[];
  }
  return [];
}

export async function getCategories(status: Status = "ACTIVE"): Promise<Category[]> {
  const { data } = await baseAPI.get("/categories", { params: { status } });
  return unwrapList<Category>(data);
}

export async function createCategory(name: string) {
  const { data } = await baseAPI.post("/categories", { name });
  return data;
}

export async function updateCategory(id: number, name: string) {
  const { data } = await baseAPI.put(`/categories/${id}`, { name });
  return data;
}

export async function deleteCategory(id: number) {
  const { data } = await baseAPI.delete(`/categories/${id}`);
  return data;
}

export async function archiveCategory(id: number) {
  const { data } = await baseAPI.patch(`/categories/${id}/archive`);
  return data;
}

export async function restoreCategory(id: number) {
  const { data } = await baseAPI.patch(`/categories/${id}/restore`);
  return data;
}