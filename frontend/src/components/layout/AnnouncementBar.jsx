import { announcementItems } from "../../data/siteContent";

export default function AnnouncementBar() {
  const loopItems = [...announcementItems, ...announcementItems];

  return (
    <div className="announcement-bar">
      <div className="announcement-track">
        {loopItems.map((item, index) => (
          <span key={`${item}-${index}`} className="announcement-item">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
