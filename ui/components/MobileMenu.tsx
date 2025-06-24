import { useState } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import styled, { keyframes } from 'styled-components';

interface MobileMenuProps {
  activePage: (path: string) => string;
  session?: any;
  firstName: string;
  lastName: string;
  position: string;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.98);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const MenuWrapper = styled.div`
  position: relative;
  display: block;

  @media (min-width: 768px) {
    display: none;
  }
`;

const HamburgerButton = styled.button`
  padding: 0.75rem;
  background: none;
  border: none;
  color: #333;
  font-size: 1.5rem;
  cursor: pointer;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  z-index: 50;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 1.5rem 1rem;
  border-radius: 0.5rem;
  animation: ${fadeIn} 0.2s ease-out;
`;

const Title = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1d4ed8;
  margin-bottom: 1rem;
`;

const MenuItem = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  font-weight: 500;
  color: ${({ active }) => (active ? '#2563eb' : '#374151')};
  margin-bottom: 0.875rem;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #1d4ed8;
  }

  i {
    font-size: 1.1rem;
  }
`;

const Logout = styled(MenuItem)`
  color: #dc2626;

  &:hover {
    color: #b91c1c;
  }
`;

const Profile = styled.div`
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Avatar = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  background: #2563eb;
  color: white;
  font-weight: 600;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;

  .name {
    font-size: 0.95rem;
    font-weight: 600;
  }

  .position {
    font-size: 0.75rem;
    color: #6b7280;
  }
`;

export default function MobileMenu({
  activePage,
  session,
  firstName,
  lastName,
  position,
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <MenuWrapper>
      <HamburgerButton onClick={toggleMenu}>
        <i className="bi bi-list" />
      </HamburgerButton>

      {isOpen && (
        <Dropdown>
          <Title>UniKeeper</Title>

          <Link href="/" passHref>
            <MenuItem active={!!activePage('/')}>
              <i className="bi bi-archive" />
              <span>Projects</span>
            </MenuItem>
          </Link>

          <Link href="/my-punch" passHref>
            <MenuItem active={!!activePage('/my-punch')}>
              <i className="bi bi-key" />
              <span>My punches</span>
            </MenuItem>
          </Link>

          <Link href="/my-task" passHref>
            <MenuItem active={!!activePage('/my-task')}>
              <i className="bi bi-bag-check" />
              <span>My Tasks</span>
            </MenuItem>
          </Link>

          <Link href="/admin" passHref>
            <MenuItem active={!!activePage('/admin')}>
              <i className="bi bi-bag-check" />
              <span>Admin Dashboard</span>
            </MenuItem>
          </Link>

          <Logout onClick={() => signOut({ redirect: true, callbackUrl: '/login' })}>
            <i className="bi bi-box-arrow-right" />
            <span>Log out</span>
          </Logout>

          {session?.user && (
            <Profile>
              <Avatar>{firstName[0]}{lastName[0]}</Avatar>
              <NameContainer>
                <span className="name">{firstName} {lastName}</span>
                <span className="position">{position}</span>
              </NameContainer>
            </Profile>
          )}
        </Dropdown>
      )}
    </MenuWrapper>
  );
}