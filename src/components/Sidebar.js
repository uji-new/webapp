import React from 'react';

export default  function SideBar() {
    return (
        <div name="panel-lateral" id="sticky-sidebar" class="col-2 px-1 bg-dark position-fixed">
            <div class="nav flex-column flex-nowrap vh-100 overflow-auto text-white p-2">
                <a href="./" class="nav-link">Link</a>
                <a href="./" class="nav-link">Link</a>
                <a href="./" class="nav-link">Link</a>
                <a href="./" class="nav-link">Link</a>
                <a href="./" class="nav-link">Link</a>
                <a href="./" class="nav-link">Link ...</a>
            </div>
        </div>
    );
}
