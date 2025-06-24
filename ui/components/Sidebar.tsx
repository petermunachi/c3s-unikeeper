import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react"
import { signOut } from 'next-auth/react';
import MobileMenu from "./MobileMenu";
import useIsMobile from "../hooks/useIsMobile";


const Sidebar = () => {
  const router = useRouter();
  const { data: session, status } = useSession()

  const activePage = (path: string) => {
    return router.asPath == path ? "selected" : "";
  };

  let firstName = ""
  let lastName = ""
  let position = ""
  let abbr = ""

  if (session && session.user) {
    // @ts-ignore
    firstName = session.user.firstName;
    // @ts-ignore
    lastName = session.user.lastName;
    // @ts-ignore
    position = session.user.position;

  }
  const isMobile = useIsMobile();


  if (isMobile) return <MobileMenu activePage={activePage} session={session} firstName={firstName} lastName={lastName} position={position} />

  return (
    <SidebarWrapper>
      <div className="img-container">
        <h1>UniKeeper</h1>
      </div>
      <div className="menu-main-container">
        <div className={`menu-container ${activePage("/")}`}>
          <div className="menu">
            <i className={`bi bi-archive`}></i>
            <Link href="/">
              <a className="">Projects</a>
            </Link>
          </div>
        </div>
        {/* <div className={`menu-container ${activePage("/report")}`}>
          <div className="menu">
            <i className={`bi bi-graph-up-arrow`}></i>
            <Link href="/report">
              <a className="">Reports</a>
            </Link>
          </div>
        </div> */}
        <div className={`menu-container ${activePage("/my-punch")}`}>
          <div className="menu">
            <i className={`bi bi-key`}></i>
            <Link href="/my-punch">
              <a className="">My punches</a>
            </Link>
          </div>
        </div>
        <div className={`menu-container ${activePage("/my-task")}`}>
          <div className="menu">
            <i className={`bi bi-bag-check`}></i>
            <Link href="/my-task">
              <a className="">My Tasks</a>
            </Link>
          </div>
        </div>

        <div className={`menu-container ${activePage("/admin")}`}>
          <div className="menu">
            <i className={`bi bi-bag-check`}></i>
            <Link href="/admin">
              <a className="">Admin Dashboard</a>
            </Link>
          </div>
        </div>

        <div className={`menu-container`} onClick={() => signOut({ redirect: true, callbackUrl: '/login' })}>
          <div className="menu">
            <i className={`bi bi-bag-check`}></i>
            <Link href="#">
              <a className="">Log out</a>
            </Link>
          </div>
        </div>

      </div>

      {
        //@ts-ignore
        session && session.user && session.user && (
          <div className="sidebar-footer">
            <div className="profile-container">
              <div className="profile-img-container">
                <div className="circle">
                  <small>{firstName.split("")[0]}{lastName.split("")[0]} </small>
                </div>
              </div>
              <div className="profile-name-container">
                <small>{firstName} {lastName}</small>
                <button type="button" className="btn btn-sm btn-primary">
                  {position}
                </button>
              </div>
              <div className="profile-icon-container">
                <i className="bi bi-arrow-down-short"></i>
              </div>
            </div>
          </div>
        )
      }


    </SidebarWrapper>
  );
};

// #3863a3

const SidebarWrapper = styled.header`
  width: 12%;
  background-color: #3863a3;
  height: 100%;
  position: fixed;

  .img-container {
    padding: 3rem 1rem 0 1rem;
  }

  .img-container h1 {
    color: white;
    font-size: 1rem;
    text-transform: uppercase;
  }

  .menu-main-container {
    margin-top: 3rem;
  }

  .menu-container {
    padding: 0.8rem 1rem;
    margin: 0.8rem 0;
    display: flex;
  }

  .menu-container:hover {
    background: #30558d;
    border-left: 3px solid #69c08b;
  }

  .menu a {
    color: white;
    font-size: 0.8rem;
    cursor: pointer;
    text-decoration: none;
  }

  .menu:hover a,
  .menu:hover .bi {
    color: white;
  }

  .selected {
    background: #30558d;
    border-left: 3px solid #69c08b;
  }

  .bi {
    font-size: 1.1rem;
    margin-right: 0.7rem;
    color: #4786d3;
  }

  small {
    display: block;
  }

  .sidebar-footer {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 3rem;
  }
  .profile-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.5rem;
  }

  .circle {
    background-color: #e7f4fe;
    color: #91a5c8;
    border-radius: 100%;
    padding: 0.2rem 0.4rem;
  }

  .profile-name-container {
    text-align: center;
  }

  .profile-name-container small {
    color: white;
  }

  .profile-name-container .btn {
    color: white;
    font-size: 0.6rem;
    cursor: none;
  }

  .profile-icon-container .bi {
    color: white;
    cursor: pointer;
  }
`;

export default Sidebar;
