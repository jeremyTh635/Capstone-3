// Necessary imports for Favourites component
import React from "react";
import Button from "react-bootstrap/Button";

// Declare function with passed props
function Favourites({ favourites, setFavourites }) {
  return (
    <div>
      <h1>My Favourites</h1>
      <ul className="resultsList">
        {/* Conditionally render favourites array in browser */}
        {favourites.length > 0 ? (
          favourites.map((album) => (
            <li key={album.collectionId}>
              <img src={album.artworkUrl60} alt="album-artwork" width={60} />
              &nbsp;&nbsp;&nbsp;&nbsp;Artist: {album.artistName}
              &nbsp;&nbsp;|&nbsp;&nbsp;Album: {album.collectionName}
              &nbsp;&nbsp;|&nbsp;&nbsp;Release Date:{" "}
              {album.releaseDate.substring(0, 4)}&nbsp;&nbsp;&nbsp;&nbsp;
              <Button
                className="addRemove"
                variant="dark"
                size="sm"
                // Remove item from favourites list
                onClick={() => {
                  setFavourites(
                    favourites.filter(
                      (a) => a.collectionId !== album.collectionId
                    )
                  );
                }}
              >
                Remove
              </Button>
            </li>
          ))
        ) : (
          <p>Waiting for data...</p>
        )}
      </ul>
    </div>
  );
}

export default Favourites;
