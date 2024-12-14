import "./App.css";
import { useContext } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import RecipeItemPage from "./pages/RecipeItemPage/RecipeItemPage";
import RecipesPage from "./pages/RecipesPage/RecipesPage";
import Root from "./Root";
import RecipeFormPage from "./pages/RecipeFormPage/RecipeFormPage";
import HomePage from "./pages/HomePage/HomePage";
import CreateAccountPage from "./pages/CreateAccountPage/CreateAccountPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import GuardedRoute from "./components/GuardedRoute/GuardedRoute";
import AuthContext from "./components/AuthProvider/AuthProvider";
import Spinner from "./components/Spinner/Spinner";

const App = () => {
  const { currentUser, isFetching } = useContext(AuthContext);

  return !isFetching ? (
    <BrowserRouter>
      <Routes>
        <Route element={<GuardedRoute isAllowed={!currentUser} redirectPath="/recipes" />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<CreateAccountPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route element={<Root />}>
          <Route element={<GuardedRoute isAllowed={!!currentUser} redirectPath="/" />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/recipes" element={<RecipesPage />} />
            <Route path="/recipes/new" element={<RecipeFormPage />} />
            <Route path="/recipes/:recipeId/edit" element={<RecipeFormPage />} />
          </Route>
          <Route path="/recipes/:recipeId" element={<RecipeItemPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  ) : (
    <div className="flex w-ful h-full justify-center items-center">
      <Spinner color="#FF8A00" className="h-20 w-20"></Spinner>
    </div>
  );
};

export default App;
