import { useEffect, useState, useMemo } from 'react';

const BASE_URL = 'https://pai-berbagi-services.up.railway.app';

export function useJenjang() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJenjang = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/jenjang`);
        const result = await response.json();
        setData(result || []);
      } catch (error) {
        console.error('Gagal memuat jenjang:', error);
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJenjang();
  }, []);

  return { data, isLoading };
}


export function useModul({ id, search, sort, limit } = {}) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Membuat queryParams stabil dan bisa dilacak oleh ESLint
  const queryParams = useMemo(() => {
    return { id, search, sort, limit };
  }, [id, search, sort, limit]);

  useEffect(() => {
    const fetchModul = async () => {
      setIsLoading(true);
      try {
        const query = new URLSearchParams();

        Object.entries(queryParams).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            query.append(key === 'id' ? 'id' : key, value);
          }
        });

        const url = `${BASE_URL}/modul${query.toString() ? `?${query.toString()}` : ''}`;
        const response = await fetch(url);
        const result = await response.json();
        setData(result || []);
      } catch (error) {
        console.error('Gagal memuat modul:', error);
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchModul();
  }, [queryParams]);

  return { data, isLoading };
}

export function useModulById(idModul) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!idModul) return;

    const fetchModulById = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/modul/${idModul}`);
        const result = await response.json();
        setData(result?.data || null);
      } catch (error) {
        console.error('Gagal memuat detail modul:', error);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchModulById();
  }, [idModul]);

  return { data, isLoading };
}

export function usePostModul() {
  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);

  const postModul = async (formData) => {
    setIsLoading(true);
    setError(null);
    setResponseData(null);

    try {
      const response = await fetch(`${BASE_URL}/modul`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || 'Gagal mengirim modul');
      }

      setResponseData(result);
      return result;
    } catch (err) {
      console.error('Error saat mengirim modul:', err);
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { postModul, isLoading, responseData, error };
}
