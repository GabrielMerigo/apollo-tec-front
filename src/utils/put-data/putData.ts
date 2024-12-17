type PutRequestParams<T> = {
  url: string;
  body: T;
};

export const putData = async <T, R>({
  url,
  body,
}: PutRequestParams<T>): Promise<R> => {
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Erro ao fazer PUT para ${url}: ${response.statusText}`);
  }

  return response.json();
};
