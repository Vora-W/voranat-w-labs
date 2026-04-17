import { Link } from "react-router-dom";
import { UserRound, RotateCcw } from "lucide-react";
import NavBar from "./NavBar";

const tabs = [
  {
    key: "profile",
    label: "Profile",
    to: "/member/profile",
    icon: UserRound,
  },
  {
    key: "reset-password",
    label: "Reset password",
    to: "/auth/reset-password",
    icon: RotateCcw,
  },
];

const desktopActiveTabClass =
  "flex items-center gap-3 text-body-1 text-brown-600 font-medium";
const desktopInactiveTabClass =
  "flex items-center gap-3 text-body-1 text-brown-400";
const mobileActiveTabClass =
  "flex items-center gap-2 text-body-1 text-brown-600 font-medium";
const mobileInactiveTabClass =
  "flex items-center gap-2 text-body-1 text-brown-400";

function MemberSettingsTab({ tab, isActive, mobile = false }) {
  const Icon = tab.icon;
  const tabClassName = mobile
    ? isActive
      ? mobileActiveTabClass
      : mobileInactiveTabClass
    : isActive
      ? desktopActiveTabClass
      : desktopInactiveTabClass;

  const content = (
    <>
      <Icon className="h-5 w-5 shrink-0" />
      {tab.label}
    </>
  );

  if (isActive) {
    return <span className={tabClassName}>{content}</span>;
  }

  return (
    <Link to={tab.to} className={tabClassName}>
      {content}
    </Link>
  );
}

function MemberSettingsLayout({
  title,
  activeTab,
  avatarSrc,
  displayName,
  children,
  cardClassName = "",
  displayNameClassName = "text-[20px] leading-none font-semibold text-brown-600 md:text-headline-3",
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <NavBar />

      <main className="flex-1 w-full bg-white pt-4 pb-16 md:pt-10 md:pb-24">
        <div className="mx-auto w-full max-w-[930px]">
          <div className="border-b border-brown-200 px-4 pb-5 md:hidden">
            <div className="flex items-center gap-6">
              {tabs.map((tab) => (
                <MemberSettingsTab
                  key={tab.key}
                  tab={tab}
                  isActive={tab.key === activeTab}
                  mobile
                />
              ))}
            </div>
          </div>

          <div className="px-4 pt-6 md:px-6 md:pt-0 lg:px-0">
            <div className="mb-8 flex items-center gap-3 md:hidden">
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brown-300"
                style={{
                  backgroundImage: avatarSrc ? `url(${avatarSrc})` : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {!avatarSrc && (
                  <UserRound className="h-5 w-5 text-brown-500" />
                )}
              </div>
              <div className="flex min-w-0 items-center gap-3">
                <span className={displayNameClassName}>{displayName || "User"}</span>
                <span className="h-7 w-px bg-brown-300" />
                <span className="text-headline-4 font-semibold text-brown-600">
                  {title}
                </span>
              </div>
            </div>

            <div className="hidden md:grid md:grid-cols-[max-content_1px_minmax(0,1fr)] md:items-start md:gap-x-4 md:gap-y-8">
              <div className="flex items-center gap-4">
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brown-300"
                  style={{
                    backgroundImage: avatarSrc ? `url(${avatarSrc})` : undefined,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {!avatarSrc && (
                    <UserRound className="h-6 w-6 text-brown-500" />
                  )}
                </div>
                <span className={displayNameClassName}>{displayName || "User"}</span>
              </div>

              <span className="h-8 w-px self-center bg-brown-300" />

              <div className="self-center">
                <span className="text-headline-3 font-semibold text-brown-600">
                  {title}
                </span>
              </div>

              <nav className="min-w-[145px] flex-col gap-5 pt-2 md:flex">
                {tabs.map((tab) => (
                  <MemberSettingsTab
                    key={tab.key}
                    tab={tab}
                    isActive={tab.key === activeTab}
                  />
                ))}
              </nav>

              <div />

              <div className="min-w-0">
                <div
                  className={`bg-brown-200 md:max-w-[550px] md:rounded-[24px] md:px-8 md:py-8 ${cardClassName}`.trim()}
                >
                  {children}
                </div>
              </div>
            </div>

            <div className="md:hidden">
              <div
                className={`-mx-4 bg-brown-200 px-4 py-8 ${cardClassName}`.trim()}
              >
                {children}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MemberSettingsLayout;
