import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faAddressBook,
    faCog,
    faCogs,
    faDatabase,
    faHome,
    faQuestionCircle,
    faSearch
} from "@fortawesome/free-solid-svg-icons";

export default class MainNav extends React.Component {

    render() {
        return (
            <div className="d-flex flex-column bg-light border-right" style={{"width": "45px", "height": "100vh"}}>
                <a href="/" className="d-block p-3 link-dark text-decoration-none" title="" data-bs-toggle="tooltip"
                   data-bs-placement="right" data-bs-original-title="Icon-only">
                    <FontAwesomeIcon icon={faAddressBook}/>

                </a>
                <ul className="nav nav-pills flex-column mb-auto align-items-start   text-center">
                    <li className="nav-item ">
                        <a href="/explorer"
                           className="nav-link   d-flex align-items-start pt-3 pb-3 justify-content-center flex-column active  border-bottom"
                           title="" data-bs-toggle="tooltip"
                           data-bs-placement="right" data-bs-original-title="Explore">
                            <FontAwesomeIcon icon={faSearch}/>
                            {/*<small>Explore</small>*/}

                        </a>
                    </li>
                    <li className="nav-item ">
                        <a href="/data"
                           className="nav-link d-flex align-items-start  pt-3 pb-3  justify-content-center flex-column  border-bottom"
                           title="" data-bs-toggle="tooltip"
                           data-bs-placement="right" data-bs-original-title="Data">
                            <FontAwesomeIcon icon={faDatabase}/>
                            {/*<small>Data</small>*/}

                        </a>
                    </li>
                    <li className="nav-item ">
                        <a href="/settings"
                           className="nav-link d-flex align-items-start pt-3 pb-3 justify-content-center flex-column  border-bottom"
                           title="" data-bs-toggle="tooltip"
                           data-bs-placement="right" data-bs-original-title="Orders">
                            <FontAwesomeIcon icon={faCog}/>

                        </a>
                    </li>
                    {/*<li>*/}
                    {/*    <a href="/" className="nav-link py-3 border-bottom" title="" data-bs-toggle="tooltip"*/}
                    {/*       data-bs-placement="right" data-bs-original-title="Products">*/}
                    {/*        <FontAwesomeIcon icon={faHome}/>*/}

                    {/*    </a>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*    <a href="/" className="nav-link py-3 border-bottom" title="" data-bs-toggle="tooltip"*/}
                    {/*       data-bs-placement="right" data-bs-original-title="Customers">*/}
                    {/*        <FontAwesomeIcon icon={faHome}/>*/}

                    {/*    </a>*/}
                    {/*</li>*/}
                </ul>
                <div className="dropdown border-top">
                    <a href="/"
                       className="d-flex align-items-center justify-content-center pt-3 pb-3 link-dark text-decoration-none  "
                    >
                        <FontAwesomeIcon icon={faQuestionCircle}/>

                    </a>

                </div>
            </div>

        )
    }
}
