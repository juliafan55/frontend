export default function Friends({ friends }) {
    return (
      <div className="profile-card">
        <div className="profile-card-header">
          Friends
          <div className="profile-header-link">See all friends</div>
        </div>
        {friends && (
          <div className="profile-card-count">
            {friends.length === 0
              ? ""
              : friends.length === 1
              ? "1 Photo"
              : `${friends.length} photos`}
          </div>
        )}
        <div className="profile-card-grid">
          {friends &&
            friends
              .slice(0, 9)
              .map((friend) => <div className="profile-photo-card"></div>)}
        </div>
      </div>
    );
  }
  