import "./default-layout/index.scss";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome} from "@fortawesome/free-solid-svg-icons";

export default class DefaultLayout extends React.Component {

    render() {
        return (
            <div>
                <div className="d-flex flex-column bg-light" style={{"width": "4.5rem"}}>
                    <a href="/" className="d-block p-3 link-dark text-decoration-none" title="" data-bs-toggle="tooltip"
                       data-bs-placement="right" data-bs-original-title="Icon-only">
                        <FontAwesomeIcon icon={faHome} />
                        <span className="visually-hidden">Icon-only</span>
                    </a>
                    <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
                        <li className="nav-item">
                            <a href="#" className="nav-link active py-3 border-bottom" title="" data-bs-toggle="tooltip"
                               data-bs-placement="right" data-bs-original-title="Home">
                                                      <FontAwesomeIcon icon={faHome} />

                            </a>
                        </li>
                        <li>
                            <a href="#" className="nav-link py-3 border-bottom" title="" data-bs-toggle="tooltip"
                               data-bs-placement="right" data-bs-original-title="Dashboard">
                                                       <FontAwesomeIcon icon={faHome} />

                            </a>
                        </li>
                        <li>
                            <a href="#" className="nav-link py-3 border-bottom" title="" data-bs-toggle="tooltip"
                               data-bs-placement="right" data-bs-original-title="Orders">
                                                       <FontAwesomeIcon icon={faHome} />

                            </a>
                        </li>
                        <li>
                            <a href="#" className="nav-link py-3 border-bottom" title="" data-bs-toggle="tooltip"
                               data-bs-placement="right" data-bs-original-title="Products">
                                                        <FontAwesomeIcon icon={faHome} />

                            </a>
                        </li>
                        <li>
                            <a href="#" className="nav-link py-3 border-bottom" title="" data-bs-toggle="tooltip"
                               data-bs-placement="right" data-bs-original-title="Customers">
                                                       <FontAwesomeIcon icon={faHome} />

                            </a>
                        </li>
                    </ul>
                    <div className="dropdown border-top">
                        <a href="#"
                           className="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle"
                           id="dropdownUser3" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="https://github.com/mdo.png" alt="mdo" width="24" height="24"
                                 className="rounded-circle"/>
                        </a>
                        <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser3">
                            <li><a className="dropdown-item" href="#">New project...</a></li>
                            <li><a className="dropdown-item" href="#">Settings</a></li>
                            <li><a className="dropdown-item" href="#">Profile</a></li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li><a className="dropdown-item" href="#">Sign out</a></li>
                        </ul>
                    </div>
                </div>
            </div>
    )
    }
}
