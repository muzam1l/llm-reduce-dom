"use server";

export type FormState = {
    error: string;
    data: null;
} | {
    error: null;
    data: string;
} | {
    error: null;
    data: null;
};

export async function fetchData(_: FormState, formData: FormData): Promise<FormState> {
    try {
        const url = formData.get("url")?.toString();
        if (!url) return { error: "No URL provided", data: null };
        const response = await fetch(url);
        if (!response.ok) {
            throw Error(response.statusText)
        };
        const data = await response.text();
        return {
            data,
            error: null
        }
    } catch (error) {
        console.error(error);
        return {
            data: null,
            error: "Error fetching data"
        }
    }
}
