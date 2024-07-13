import AllMods from "@/components/AllMods";
import SearchBar from "@/components/SearchBar";

function App() {
  return (
    <div className="m-auto flex h-full w-full flex-col text-xs md:text-sm">
      <SearchBar />
      <div className="modlist-scroll h-full overflow-y-auto overflow-anchor-none">
        <AllMods />
      </div>
    </div>
  );
}

export default App;
