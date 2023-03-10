import { AxiosError } from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { iLoginFormValues } from "../components/FormLogin/type";
import api from "../services/api";

interface iUserProvider {
  children: ReactNode;
}

export interface iRequestError {
  error: string;
  response: iRequestErrorResponse | undefined;
}

export interface iRequestErrorResponse {
  data: string | undefined;
}

export interface iUser {
  type: string;
  email: string;
  password: string;
  name: string;
  age: number;
  cpf: string;
  cpfParent?: string;
  class?: string;
  grades?: iGrade;
  id: number;
}

export interface iGrade {
  mathematics: string[];
  portuguese: string[];
  sciences: string[];
  history: string[];
  geography: string[];
  art: string[];
  physicalEducation: string[];
}

interface iUserContext {
  getChildGrades: (cpfParent: string) => Promise<void>;
  user: iUser | null;
  setUser: (props: iUser) => void;
  childs: iUser[] | null | undefined;
  classRoom: iClassRoom[] | null | undefined;
  listClassRooms: () => Promise<void>;
  studentGrade: iUser;
  schoolGrades: (studentId: number) => Promise<void>;
  submit: SubmitHandler<iLoginFormValues>;
  getClassStudents: () => Promise<void>;
  changeStudentGrade: (data: iGrade) => Promise<void>;
  addStudentToClass: (data: iClassRoom) => Promise<void>;
}

interface iClassRoom {
  class: string;
  grade: iGrade;
  schoolGrades: (studentId: number) => Promise<void>;
  studentGrade: iUser;
  // setStudentGrade: React.Dispatch<React.SetStateAction<iUser>|[]>
}

export const UserContext = createContext<iUserContext>({} as iUserContext);

export const UserProvider = ({ children }: iUserProvider) => {
  const [user, setUser] = useState<iUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [childs, setChilds] = useState<iUser[] | null | undefined>(null);
  const [classRoom, setClassRoom] = useState<iClassRoom[] | null | undefined>(
    null
  );

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    return navigate("/");
  };

  const getChildGrades = async (cpfParent: string) => {
    // const tokenLS = localStorage.getItem('@TOKEN');
    // token abaixo somente para testes
    const tokenLS =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtlbnppbmhvQG1haWwuY29tIiwiaWF0IjoxNjc4NDc1NDAyLCJleHAiOjE2Nzg0NzkwMDIsInN1YiI6IjEifQ.P0RtyKXKFOaoPRIz-k91XxVzYJBU1I6Qe7thCJBe1Es"
    try {
      const users = await api.get<iUser[]>(`/users?cpfParent=${cpfParent}`, {
        headers: {
          Authorization: `Bearer ${tokenLS}`,
        },
      });
      setChilds(users.data);
    } catch (error) {
      const currentError = error as AxiosError<iRequestError>;
      console.log(currentError);
    }
  };

  const listClassRooms = async () => {
    const teacherToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtlbnppbmhvQG1haWwuY29tIiwiaWF0IjoxNjc4NDY0MTMzLCJleHAiOjE2Nzg0Njc3MzMsInN1YiI6IjEifQ.WmGALfcedQLuMT-x0pbAjOsb-DN3X9N4_6QWHEC0IWk"
    try {
      const response = await api.get<iClassRoom[]>("/classes", {
        headers: {
          Authorization: `Bearer ${teacherToken}`,
        },
      });
      setClassRoom(response.data);
    } catch (error) {
      const currentError = error as AxiosError<iRequestError>;
      console.log(currentError);
    }
  };

  const getClassStudents = async () => {
    const teacherToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByb2Zlc3NvckBtYWlsLmNvbSIsImlhdCI6MTY3ODM3NTAwNCwiZXhwIjoxNjc4Mzc4NjA0LCJzdWIiOiIzIn0.zOVJbyKovxbCl8C9uENfyQwbdRt6HOyXxs8kEBhzwyM";

    try {
      const response = await api.get<iUser[]>("/users?class=502", {
        headers: {
          Authorization: `Bearer ${teacherToken}`,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const changeStudentGrade = async (data: iGrade) => {
    const teacherToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByb2Zlc3NvckBtYWlsLmNvbSIsImlhdCI6MTY3ODM3NTAwNCwiZXhwIjoxNjc4Mzc4NjA0LCJzdWIiOiIzIn0.zOVJbyKovxbCl8C9uENfyQwbdRt6HOyXxs8kEBhzwyM";

    try {
      const response = await api.patch<iUser>("/users/1", data, {
        headers: {
          Authorization: `Bearer ${teacherToken}`,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const addStudentToClass = async (data: iClassRoom) => {
    const teacherToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByb2Zlc3NvckBtYWlsLmNvbSIsImlhdCI6MTY3ODM3NTAwNCwiZXhwIjoxNjc4Mzc4NjA0LCJzdWIiOiIzIn0.zOVJbyKovxbCl8C9uENfyQwbdRt6HOyXxs8kEBhzwyM";

    try {
      const response = await api.patch<iUser>("/users/1", data, {
        headers: {
          Authorization: `Bearer ${teacherToken}`,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  const [studentGrade, setStudentGrade] = useState<iUser>({} as iUser);

  async function schoolGrades(studentId: number) {
    const tokenLS =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtlbnppbmhvQG1haWwuY29tIiwiaWF0IjoxNjc4MzcxOTkwLCJleHAiOjE2NzgzNzU1OTAsInN1YiI6IjEifQ.1sqClQSeGf4fnMPPtuwVNOJJRSd2hCx9_pSDsUosmOw";

    try {
      const response = await api.get<iUser>(`/users/${1}`, {
        headers: {
          Authorization: `Bearer ${tokenLS}`,
        },
      });
      setStudentGrade(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  const submit: SubmitHandler<iLoginFormValues> = async (data) => {
    try {
      const response = await api.post("login", data);
      localStorage.setItem("@TOKEN", response.data.acessToken);
      setUser(response.data.user);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    } finally {
      navigate("/dashboard");
    }
  };

  return (
    <UserContext.Provider
      value={{
        getChildGrades,
        user,
        setUser,
        childs,
        schoolGrades,
        studentGrade,
        classRoom,
        listClassRooms,
        submit,
        getClassStudents,
        changeStudentGrade,
        addStudentToClass
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
