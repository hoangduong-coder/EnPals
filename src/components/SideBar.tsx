import { BadgeEuro, BarChart3, Home, Settings, ShieldHalf } from "lucide-react";
import { ElementType, useEffect } from "react";
import { buttonStyles } from "./Button";
import { twMerge } from "tailwind-merge";
import { useDispatch, useSelector } from "react-redux";
import { close } from "../reduxTookit/sidebarContext";
import useMediaQuery from "../hooks/useMediaQuery";
import symbol from "../assets/symbol.png";

interface RootState {
  sidebar: {
    isSmallOpen: boolean;
  };
}

const Sidebar = () => {
  const { isSmallOpen } = useSelector((state: RootState) => state.sidebar);
  const dispatch = useDispatch();
  const isAboveMediumScreens = useMediaQuery("(min-width: 768px)");

  const handleClose = () => {
    console.log("clicked");
    dispatch(close());
  };

  useEffect(() => {
    isAboveMediumScreens && dispatch(close());
  }, [isAboveMediumScreens]);

  return (
    <>
      {/* small screen */}
      <aside
        className={`fixed z-[9999] md:hidden top-0 bg-primary-50 h-screen text-gray-800 left-0 overflow-y-auto 
      scrollbar-hidden pb-4 px-2 flex-col items-center ${
        isSmallOpen ? "flex" : "hidden"
      }`}
      >
        <a href="/" className="items-center justify-center flex my-8">
          <img src={symbol} alt="youtube-symbol" className="h-10" />
          <p className="text-lg font-bold">EnPals</p>
        </a>
        <SmallSidebarItem Icon={Home} title="Dashboard" url="/" />
        <SmallSidebarItem Icon={BarChart3} title="Reports" url="/reports" />
        <SmallSidebarItem
          Icon={BadgeEuro}
          title="Subscriptions"
          url="/subscriptions"
        />
        <SmallSidebarItem Icon={ShieldHalf} title="Payments" url="/payments" />
        <SmallSidebarItem Icon={Settings} title="Settings" url="/settings" />
      </aside>
      {isSmallOpen && (
        <div
          onClick={handleClose}
          className="md:hidden fixed inset-0 z-[999] bg-secondary-dark opacity-50"
        />
      )}

      {/* large */}
      <aside
        className={`w-56 md:sticky md:flex hidden top-0 overflow-y-auto 
        scrollbar-hidden pb-4 flex-col gap-2`}
      >
        <LargeSidebarItem isActive Icon={Home} title="Home" url="/" />
        <LargeSidebarItem Icon={BarChart3} title="Reports" url="/reports" />
        <LargeSidebarItem
          Icon={BadgeEuro}
          title="Subscriptions"
          url="/subscriptions"
        />
        <LargeSidebarItem Icon={ShieldHalf} title="Payments" url="/payments" />
        <LargeSidebarItem Icon={Settings} title="Settings" url="/settings" />
      </aside>
    </>
  );
};

type SmallSidebarItemProps = {
  Icon: ElementType;
  title: string;
  url: string;
};

function SmallSidebarItem({ Icon, title, url }: SmallSidebarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        "py-4 px-1 flex flex-col items-center rounded-lg gap-1"
      )}
    >
      <Icon className="w-6 h-6" />
      <div className="text-sm">{title}</div>
    </a>
  );
}

type LargeSidebarItemProps = {
  Icon: ElementType;
  title: string;
  url: string;
  isActive?: boolean;
};

function LargeSidebarItem({
  Icon,
  title,
  url,
  isActive,
}: LargeSidebarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        `w-full flex items-center rounded-lg gap-4 p-3 hover:bg-primary ${
          isActive ? "font-bold bg-primary-100 " : undefined
        }`
      )}
    >
      <Icon className="w-6 h-6" />
      <div className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </div>
    </a>
  );
}

export default Sidebar;