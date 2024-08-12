import { useReducer } from "react";

type AdventureLogEntries = {
  logEntry: string;
  logType: "item" | "enemy" | "quest";
};

const logReducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD_LOG":
      return {
        ...state,
        logEntryTypes: {
          ...state.logEntryTypes,
          ...action.payload.logEntryTypes,
        },
        logEntries: [...state.logEntries, action.payload],
      };
    case "ADD_ITEM":
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case "ADD_ENEMY":
      return {
        ...state,
        enemies: [...state.enemies, action.payload],
      };
    case "ADD_QUEST":
      return {
        ...state,
        quests: [...state.quests, action.payload],
      };
    default:
      throw new Error("Unknown action type");
  }
};
const AdventureLog = () => {
  const initialState = {
    logEntries: [] as AdventureLogEntries[],
    logEntryTypes: {
      item: 0,
      enemy: 0,
      quest: 0,
    },
    items: [],
    enemies: [],
    quests: [],
  };

  const [state, dispatch] = useReducer(logReducer, initialState);

  const addItem = (item: string) => {
    dispatch({ type: "ADD_ITEM", payload: item });
    dispatch({
      type: "ADD_LOG",
      payload: {
        logEntry: `Collected item: ${item}`,
        logType: "item",
        logEntryTypes: {
          item: state.logEntryTypes.item + 1,
        },
      },
    });
  };

  const addEnemy = (enemy: string) => {
    dispatch({ type: "ADD_ENEMY", payload: enemy });
    dispatch({
      type: "ADD_LOG",
      payload: {
        logEntry: `Defeated enemy: ${enemy}`,
        logType: "enemy",
        logEntryTypes: {
          enemy: state.logEntryTypes.enemy + 1,
        },
      },
    });
  };

  const addQuest = (quest: string) => {
    dispatch({ type: "ADD_QUEST", payload: quest });
    dispatch({
      type: "ADD_LOG",
      payload: {
        logEntry: `Completed quest: ${quest}`,
        logType: "quest",
        logEntryTypes: {
          quest: state.logEntryTypes.quest + 1,
        },
      },
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const selectedOption = formData.get("logType");
    const log = formData.get("logEntry");

    switch (selectedOption) {
      case "item":
        addItem(log as string);
        break;
      case "enemy":
        addEnemy(log as string);
        break;
      case "quest":
        addQuest(log as string);
        break;
      default:
        console.log("Unknown option");
    }

    // clear form fields
    event.currentTarget.reset();
  };

  return (
    <section id="adventure-log" className="px-6 rounded-2xl bg-slate-100 ">
      <AdventureLogHeader />

      <AdventureStatistics state={state} />

      <AdventureLogForm handleSubmit={handleSubmit} />

      <LogEntriesList logEntries={state.logEntries} />
    </section>
  );
};

/** ADVENTURE LOG COMPONENTS */
type AdventureLogTileProps = {
  icon: string;
  name: string;
  count: number;
};

type AdventureStatisticsProps = {
  state: {
    logEntries: AdventureLogEntries[];
    logEntryTypes: { [key: string]: number };
  };
};

type AdventureLogFormProps = {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

type LogEntriesProps = {
  logEntries: AdventureLogEntries[];
};

const AdventureLogHeader = () => {
  return (
    <div className="flex justify-between align-middle pt-8 pb-3 ">
      <img src="./triforce.png" alt="Triforce" className="w-8 h-8" />
      <h1 className="text-2xl">Adventure Log</h1>
      <img
        src="https://assetsio.gnwcdn.com/tears-of-the-kingdom-selfie-1.jpg?width=1200&height=1200&fit=crop&quality=100&format=png&enable=upscale&auto=webpg"
        alt="Triforce"
        className="w-10 h-10 rounded-full"
      />
    </div>
  );
};

const AdventureLogTile = ({ icon, name, count }: AdventureLogTileProps) => {
  return (
    <div className="flex flex-wrap items-center justify-between p-4 w-full h-22 rounded-lg shadow-md bg-gradient-to-br from-green-700 to-green-500">
      <div className="flex flex-col items-center">
        <i className={`lni lni-${icon} text-5xl pb-1`}></i>
        <span className="text-xs font-bold">{name}</span>
      </div>
      <p className="text-6xl">{count}</p>
    </div>
  );
};

const AdventureStatistics = ({ state }: AdventureStatisticsProps) => {
  const TILES = [
    { icon: "t-shirt", name: "Items", key: "item" },
    { icon: "shield", name: "Enemies", key: "enemy" },
    { icon: "map", name: "Quests", key: "quest" },
  ];

  return (
    <div className="flex flex-wrap justify-between gap-4 bg-white p-8 rounded-2xl">
      <h2 className="w-full text-xl">Adventure Overview</h2>

      <AdventureLogTile
        key={"logs"}
        icon={"pencil-alt"}
        count={state.logEntries.length || 0}
        name={"Log Entries"}
      />
      {TILES.map((tile, index) => (
        <AdventureLogTile
          key={index}
          icon={tile.icon}
          count={state.logEntryTypes[tile.key.toLowerCase()] || 0}
          name={tile.name}
        />
      ))}
    </div>
  );
};

const AdventureLogForm = ({ handleSubmit }: AdventureLogFormProps) => {
  return (
    <div className="flex flex-wrap justify-between mt-5 bg-white p-8 rounded-2xl">
      <h2 className="w-full text-xl mb-4">Add Adventure Log</h2>
      <form
        className="flex flex-col items-center w-full gap-3"
        onSubmit={handleSubmit}
      >
        <select
          name="logType"
          className="w-full p-3 bg-white border border-gray-300 rounded-lg shadow-sm"
        >
          <option value="item">Item</option>
          <option value="enemy">Enemy</option>
          <option value="quest">Quest</option>
        </select>
        <input
          type="text"
          name="logEntry"
          placeholder="Log Entry"
          className="w-full p-3 bg-white border border-gray-300 rounded-lg shadow-sm"
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-black rounded-lg p-3 shadow-md"
        >
          Add Adventure Log
        </button>
      </form>
    </div>
  );
};

const LogEntriesList = ({ logEntries }: LogEntriesProps) => {
  const ITEMS_TO_ICONS_MAP = {
    item: "t-shirt",
    enemy: "shield",
    quest: "map",
  };

  return (
    <div className="flex flex-wrap justify-between mt-5  bg-white p-8 rounded-2xl">
      <h2 className="w-full text-xl mb-4">Log Entries</h2>
      {logEntries.length !== 0 ? (
        <ul className="w-full flex flex-col-reverse">
          {logEntries.map((log, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-4 mt-2 gap-2 bg-zinc-50 rounded-lg shadow-md"
            >
              <i
                className={`lni lni-${ITEMS_TO_ICONS_MAP[log.logType]} text-2xl`}
              ></i>
              <p>{log.logEntry}</p>
              <button>
                <i className="lni lni-trash"></i>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No log entries yet. Go on an adventure!</p>
      )}
    </div>
  );
};

export default AdventureLog;
