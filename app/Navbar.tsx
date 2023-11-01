"use client";
import {
  Box,
  Button,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsBug } from "react-icons/bs";

const Navbar = () => {
  const currentPath = usePathname();
  const navlinks = [
    { label: "Dashboard", href: "/", hidden: true },
    { label: "Issues", href: "/issues", hidden: false },
  ];

  return (
    <nav className="px-4 py-6 border-b">
      <Container>
        <Flex align="center" justify="between">
          <Link href="/">
            <Flex align="center" gap={{ initial: "2", md: "3" }}>
              <BsBug className="text-3xl text-[#08FFD6D4]" />
              <Text size={{ initial: "4", md: "7" }} weight="medium">
                Issue <Text color="teal">Tracker</Text>
              </Text>
            </Flex>
          </Link>

          <Flex align="center" justify="center" gap="3">
            <Flex gap="3">
              {navlinks.map((link) => {
                const { href, label, hidden } = link;
                return (
                  <Link
                    key={label}
                    href={href}
                    className={`${
                      href === currentPath && "text-[#08FFD6D4]"
                    } hover:text-[#08FFD6D4] transition-colors ${
                      hidden && "hidden sm:block"
                    }`}
                  >
                    <Text size="4" weight="medium">
                      {label}
                    </Text>
                  </Link>
                );
              })}
            </Flex>
            <AuthStatus />
          </Flex>
        </Flex>
      </Container>
    </nav>
  );
};

const AuthStatus = () => {
  const session = true;
  if (!session)
    return (
      <Link href="/api/auth/signin">
        <Button>Sign In</Button>
      </Link>
    );
  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Text className="cursor-pointer">Avatar</Text>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>Email</DropdownMenu.Label>
          <DropdownMenu.Label>Log Out</DropdownMenu.Label>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};
export default Navbar;
