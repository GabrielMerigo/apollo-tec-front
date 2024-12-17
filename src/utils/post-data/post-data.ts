type PostRequestParams<T> = {
  url: string;
  body: T;
};

export const postData = async <T, R>({
  url,
  body,
}: PostRequestParams<T>): Promise<R> => {
  console.log("Enviando requisição para:", url);
  console.log("Dados enviados:", body);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Erro ao fazer POST para ${url}: ${response.statusText}`);
  }

  return response.json();
};
