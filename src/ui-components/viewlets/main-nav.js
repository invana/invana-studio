import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCog, faCube,
    faDatabase,
    faQuestionCircle, faTerminal
} from "@fortawesome/free-solid-svg-icons";
import {faPiedPiper} from "@fortawesome/free-brands-svg-icons";

export default class MainNav extends React.Component {

    render() {
        return (
            <div className="d-flex flex-column bg-white border-right" style={{"width": "50px", "height": "100vh"}}>
                <a href="/" className="d-block px-auto pt-2 pb-2 text-dark text-decoration-none border-bottom" title=""
                   data-bs-toggle="tooltip"
                   data-bs-placement="right" data-bs-original-title="Icon-only">

                    <div className={"text-center"}><FontAwesomeIcon size={'3x'} icon={faPiedPiper}/></div>

                    {/*<div className={"font-weight-bold pl-1"}>Invana Studio</div>*/}

                </a>
                <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
                    <li className="nav-item ">
                        <a href="/explorer"
                           className="nav-link  pt-3 pb-3 px-auto border-bottom  text-dark"
                           title="" data-bs-toggle="tooltip"
                           data-bs-placement="right" data-bs-original-title="Explore">
                            <FontAwesomeIcon icon={faCube}/>
                            {/*<small>Explore</small>*/}

                        </a>
                    </li>
                    <li className="nav-item ">
                        <a href="/data"
                           className="nav-link  pt-3 pb-3 px-auto border-bottom  text-dark"
                           title="" data-bs-toggle="tooltip"
                           data-bs-placement="right" data-bs-original-title="Data">
                            <FontAwesomeIcon icon={faDatabase}/>
                            {/*<small>Data</small>*/}

                        </a>
                    </li>
                    <li className="nav-item ">
                        <a href="/console"
                           className="nav-link  pt-3 pb-3 px-auto border-bottom  text-dark"
                           title="" data-bs-toggle="tooltip"
                           data-bs-placement="right" data-bs-original-title="Data">
                            <FontAwesomeIcon icon={faTerminal}/>
                            {/*<small>Data</small>*/}

                        </a>
                    </li>
                    <li className="nav-item ">
                        <a href="/settings"
                           className="nav-link  pt-3 pb-3 px-auto border-bottom  text-dark"
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
                <div className="">
                    <a href="https://docs.invana.io" target={"_new"}
                       className="d-flex align-items-center justify-content-center
                        pt-3 pb-1  px-auto  text-dark text-decoration-none  ">
                        <FontAwesomeIcon icon={faQuestionCircle}/>
                    </a>
                </div>
                {/*<div className="border-top">*/}
                {/*    <a href="/" style={{"height": "23px"}}*/}
                {/*       className="d-flex align-items-center justify-content-center*/}
                {/*          link-dark text-decoration-none  ">*/}
                {/*        <FontAwesomeIcon icon={faQuestionCircle}/>*/}
                {/*    </a>*/}
                {/*</div>*/}
            </div>

        )
    }
}
