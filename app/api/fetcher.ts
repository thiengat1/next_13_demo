import axios from 'axios';

type Args = {
  url: string;
  headers?: Record<string, string> | null;
};

export const fetcher = async ({ url, headers }: Args) => {
  try {
    const res = await axios.get(`http://localhost:4000${url}`, headers || {});
    return res.data;
  } catch (err) {}
};
