import { useAuthStore } from "../../store/authUsers";
import AuthScreen from "./AuthPage";
import HomeScreen from "./HomeScreen";

const HomePage = () => {
	const { user } = useAuthStore();
	return <>{user ? <HomeScreen /> : <AuthScreen />}</>;
};
export default HomePage;