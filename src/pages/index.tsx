import dynamic from "next/dynamic";

const App = dynamic(() => import("../components/App"), {
  ssr: false,
});

export default () => {
  console.log("niceeeeeeeee");
  return (
    <div className="flex flex-col space-y-2">
      <h1 className="text-9xl text-primary-500">Hello</h1>
      <App />
    </div>
  );
};
