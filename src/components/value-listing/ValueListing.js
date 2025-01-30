import FeaturedValue from "../featured-value/FeaturedValue";
import ProposeValueButton from "../propose-value-button/ProposeValueButton";
import SearchControls from "../search-controls/SearchControls";
import ValueCard from "../value-card/ValueCard";
import styles from "./value-listing.module.scss";

const FEATURED_VALUES = [
  {
    color: "pink",
    title: "Decentralization",
    description:
      "Decentralization is viewed as essential to preventing censorship, increasing transparency, and creating more resilient systems. It's a response to centralized systems that can be manipulated, controlled, or restricted by governments or large entities.",
    totalAmount: 2.3789,
    totalUsers: 7123,
  },
  {
    color: "blue",
    title: "Permissionlessness",
    description:
      "Anyone can develop on Ethereum without needing permission, ensuring inclusivity. This openness encourages innovation, as developers can freely build dapps and experiment with smart contracts.",
    totalAmount: 1.9572,
    totalUsers: 5643,
  },
  {
    color: "green",
    title: "Trustlessness and Transparency",
    description:
      "All transactions and smart contracts on Ethereum are publicly recorded on the blockchain, ensuring transparency. This fosters an ecosystem where rules and processes are clear and can be verified by anyone.",
    totalAmount: 1.9572,
    totalUsers: 5643,
  },
  {
    color: "red",
    title: "Autonomy and Self-Sovereignty",
    description:
      "Ethereum supports the concept of individual autonomy, where users have control over their data, assets, and digital identities. Ethereum empowers individuals to manage their assets without relying on traditional institutions, promoting personal freedom and economic independence.",
    totalAmount: 1.9572,
    totalUsers: 5643,
  },
  {
    color: "gray",
    title: "Value Title",
    description:
      "Molestie volutpat enim amet ut porta pellentesque. Orci lorem vitae blandit dignissim eu mauris justo praesent. Vulputate in commodo neque mauris sapien.",
    totalAmount: 1.9572,
    totalUsers: 5643,
  },
];

const ValueListing = () => {
  return (
    <div className={styles.listing}>
      <div className={styles.toolbar}>
        <SearchControls />
        <div>
          <ProposeValueButton />
        </div>
      </div>
      <div className={styles.featuredValues}>
        {FEATURED_VALUES.map((value) => (
          <FeaturedValue
            key={value.title}
            title={value.title}
            description={value.description}
            totalAmount={value.totalAmount}
            totalUsers={value.totalUsers}
            color={value.color}
          />
        ))}
      </div>
      <div className={styles.values}>
        {FEATURED_VALUES.map((value) => (
          <ValueCard
            key={value.title}
            title={value.title}
            description={value.description}
            totalAmount={value.totalAmount}
            totalUsers={value.totalUsers}
            color={value.color}
          />
        ))}
      </div>
    </div>
  );
};

export default ValueListing;
