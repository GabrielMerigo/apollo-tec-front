type FetchOptions = {
  url: string;
  token?: string;
};

export const URL = "https://jpcreditoeseguros-backoffice-api.vercel.app";

export const fetchData = async <T>({ url }: FetchOptions): Promise<T> => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erro ao buscar dados: ${response.statusText}`);
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    throw error;
  }
};
