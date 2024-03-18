import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <div className="flex items-center shadow-md rounded-full py-2 px-6">
      <FontAwesomeIcon icon={faSearch} className="text-gray-400 mr-3" />
      <input
        type="text"
        placeholder="Search Posts"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full bg-transparent border-none placeholder-gray-400 focus:outline-none text-gray-600"
        style={{ borderRadius: "15px", padding: "10px" }}
      />
    </div>
  );
};

export default SearchBar;
