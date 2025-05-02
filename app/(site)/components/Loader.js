

export default function Loader({ color = "#D96666", size = "40px" }) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div
          className="animate-spin rounded-full border-t-4 border-opacity-50"
          style={{
            width: size,
            height: size,
            borderTopColor: color,
            borderRightColor: "transparent",
            borderBottomColor: "transparent",
            borderLeftColor: "transparent",
            borderWidth: "4px",
          }}
        ></div>
      </div>
    );
  }
  