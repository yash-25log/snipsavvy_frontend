import React, { useState, useEffect } from "react";
import { FaFolderOpen } from "react-icons/fa";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

const Collection = ({ Workspace }: { Workspace: string }) => {
  const [showInput, setShowInput] = useState(false);
  const [collection, setCollection] = useState<any>([]);
  const [data, setData] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();
  const workspace = searchParams.get("workspace") || "";

  useEffect(() => {
    axios
      .get(`https://snipsavvy.onrender.com/vi/api/category/${workspace}`)
      .then((response) => {
        setCollection(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [workspace]);

  const handleAddClick = () => {
    setShowInput(!showInput);
  };

  const handleCreateCollection = async () => {
    const body = {
      id: workspace,
      name: data,
      description: "SnipSavvy Project Snippets",
    };
    await axios
      .post("https://snipsavvy.onrender.com/vi/api/category", body)
      .then((response) => {
        console.log(response);
        alert("Collection created successfully");
        window.location.reload();
        setCollection((prevCollection: any) => [
          ...prevCollection,
          response.data,
        ]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCreateCollection();
    }
  };

  const updateUrl = (name: string) => {
    const query: Record<string, string> = { workspace };
    if (name) query.collection = name;
    router.push(`?${new URLSearchParams(query).toString()}`);
  };

  return (
    <div className="w-[17vw] border-l-2 border-slate-700 bg-[#1E1F21] overflow-none">
      <div>
        <div className="flex m-8 items-center justify- ">
          <div className="mr-3 text-gray-400  ">
            <FaFolderOpen />
          </div>
          <div className="flex">
            <p className="text-sm text-gray-400 font-bold mr-8">Collections</p>
            <button
              className="font-extrabold rounded-full pb-4 h-6 w-6 -mt-1 text-lg ml-2 text-gray-400 hover:text-white hover:"
              onClick={handleAddClick}
            >
              +
            </button>
          </div>
        </div>
        {showInput && (
          <div className="flex items-center ">
            <Input
              value={data}
              type="text"
              className="mb-8 ml-16 w-28 h-8 rounded p-1 text-white"
              placeholder="Add Collection"
              onChange={(e) => setData(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button onClick={handleCreateCollection} className="mb-8">
              {" "}
              ☑️{" "}
            </button>
          </div>
        )}
        <ContextMenu>
          <div className="-mt-4">
            {collection.map(({ _id, name }: any) => (
              <div
                key={_id}
                onClick={() => updateUrl(_id)}
                className="h-10 w-44 m-auto ml-6 pl-2 pt-1 text-lg mt-4 text-slate-300 hover:text-white cursor-pointer"
              >
                {name}
              </div>
            ))}
          </div>
          <ContextMenuContent>
            <ContextMenuItem>Edit</ContextMenuItem>
            <ContextMenuItem>Delete</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </div>
    </div>
  );
};

export default Collection;
