import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Student = {
  id: number;
  name: string;
  reg_no: string;
  email: string;
  mobile_number: string;
};

type ClassData = {
  class_name: string;
  student_count: number;
  students: Student[];
};

export function useClassStudents() {
  const [data, setData]       = useState<ClassData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  const fetch_students = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = await AsyncStorage.getItem('authToken');

      const res = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/teacher/class/students`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        }
      );

      const json = await res.json();

      if (!json.success) throw new Error(json.message ?? 'Failed to load');

      setData(json);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch_students();
  }, []);

  return { data, loading, error, refetch: fetch_students };
}