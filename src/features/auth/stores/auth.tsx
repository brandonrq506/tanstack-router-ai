import {
	type PropsWithChildren,
	createContext,
	use,
	useCallback,
	useEffect,
	useState,
} from "react";

export type AuthContext = {
	isAuth: boolean;
	login: (token: string) => void;
	logout: () => void;
};

const AuthContext = createContext<AuthContext | null>(null);

const key = "token";

const getStoredToken = () => localStorage.getItem(key);

const setStoredToken = (token: string | null) => {
	if (token) localStorage.setItem(key, token);
	else localStorage.removeItem(key);
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
	const [isAuth, setIsAuth] = useState(getStoredToken());

  console.log(isAuth);

	const logout = useCallback(async () => {
		setStoredToken(null);
		setIsAuth(null);
	}, []);

	const login = useCallback(async (token: string) => {
		setStoredToken(token);
		setIsAuth(token);
	}, []);

	useEffect(() => {
		setIsAuth(getStoredToken());
	}, []);

	return (
		<AuthContext.Provider value={{ isAuth: Boolean(isAuth), login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = use(AuthContext);
	if (!context) throw new Error("useAuth must be used within an AuthProvider");
	return context;
};
