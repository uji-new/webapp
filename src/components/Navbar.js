import React from 'react';

export default function Nav() {
    return (
      <nav class="navbar navbar-light bg-light">
        <div name="panel-seperior" class="container-fluid">
            <a class="navbar-brand">Navbar</a>
            <form class="d-flex input-group w-auto">
                <input
                  type="search"
                  class="form-control"
                  placeholder="Type location"
                  aria-label="Search"
                />
                <button
                  class="btn btn-outline-primary"
                  type="button"
                  data-mdb-ripple-color="dark"
                >
                  Search
                </button>
              </form>
        </div>
      </nav>
    );
  }

