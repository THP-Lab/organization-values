"use client";

import { useEffect, useState } from "react";
import FeaturedValue from "../featured-value/FeaturedValue";
import ProposeValueButton from "../propose-value-button/ProposeValueButton";
import SearchControls from "../search-controls/SearchControls";
import ValueCard from "../value-card/ValueCard";
import styles from "./value-listing.module.scss";
import Carousel from "../carousel/Carousel";

const FEATURED_VALUES = [
  {
    id: 1,
    color: "pink",
    title: "Decentralization",
    description:
      "Decentralization is viewed as essential to preventing censorship, increasing transparency, and creating more resilient systems. It's a response to centralized systems that can be manipulated, controlled, or restricted by governments or large entities.",
    totalAmount: 2.3789,
    totalUsers: 7123,
  },
  {
    id: 2,
    color: "blue",
    title: "Permissionlessness",
    description:
      "Anyone can develop on Ethereum without needing permission, ensuring inclusivity. This openness encourages innovation, as developers can freely build dapps and experiment with smart contracts.",
    totalAmount: 1.9572,
    totalUsers: 5643,
  },
  {
    id: 3,
    color: "green",
    title: "Trustlessness and Transparency",
    description:
      "All transactions and smart contracts on Ethereum are publicly recorded on the blockchain, ensuring transparency. This fosters an ecosystem where rules and processes are clear and can be verified by anyone.",
    totalAmount: 1.9572,
    totalUsers: 5643,
  },
  {
    id: 4,
    color: "red",
    title: "Autonomy and Self-Sovereignty",
    description:
      "Ethereum supports the concept of individual autonomy, where users have control over their data, assets, and digital identities. Ethereum empowers individuals to manage their assets without relying on traditional institutions, promoting personal freedom and economic independence.",
    totalAmount: 1.9572,
    totalUsers: 5643,
  },
  {
    id: 5,
    color: "gray",
    title: "Value Title",
    description:
      "Molestie volutpat enim amet ut porta pellentesque. Orci lorem vitae blandit dignissim eu mauris justo praesent. Vulputate in commodo neque mauris sapien.",
    totalAmount: 1.9572,
    totalUsers: 5643,
  },
];

const ValueListing = () => {
  const [values, setValues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [sortBy, setSortBy] = useState("stake");
  const [showOnlyVoted, setShowOnlyVoted] = useState(false);

  const pageSize = 5;

  useEffect(() => {
    const fetchValues = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/values?page=${currentPage}&pageSize=${pageSize}&sortBy=${sortBy}${
            showOnlyVoted ? "&address=user123" : ""
          }`
        );
        const data = await response.json();

        if (currentPage === 1) {
          setValues(data.values);
        } else {
          setValues((prev) => [...prev, ...data.values]);
        }

        setHasMore(currentPage + 1 < data.totalPages);
      } finally {
        setIsLoading(false);
      }
    };

    fetchValues();
  }, [currentPage, sortBy, showOnlyVoted]);

  const handleLoadMore = () => {
    if (!isLoading) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  };

  const handleFilterChange = (checked) => {
    setShowOnlyVoted(checked);
    setCurrentPage(1);
  };

  const showLoadMore = values.length > 0 && hasMore;

  return (
    <div className={styles.listing}>
      <div className={styles.toolbar}>
        <SearchControls
          onSortChange={handleSortChange}
          onFilterChange={handleFilterChange}
        />
        <div>
          <ProposeValueButton />
        </div>
      </div>
      <div className={styles.featuredValues}>
        {FEATURED_VALUES.map((value) => (
          <FeaturedValue
            key={value.id}
            title={value.title}
            description={value.description}
            totalAmount={value.totalAmount}
            totalUsers={value.totalUsers}
            color={value.color}
          />
        ))}
      </div>
      <Carousel className={styles.featuredValuesMobile}>
        {FEATURED_VALUES.map((value) => (
          <div key={value.id} className={styles.carouselItem}>
            <FeaturedValue
              title={value.title}
              description={value.description}
              totalAmount={value.totalAmount}
              totalUsers={value.totalUsers}
              color={value.color}
            />
          </div>
        ))}
      </Carousel>
      <div className={styles.values}>
        {values.map((value) => (
          <ValueCard
            key={value.id}
            title={value.valueName}
            description={value.description}
            totalAmount={value.totalStaked}
            totalUsers={value.totalUsers}
            color="gray"
          />
        ))}
      </div>
      {showLoadMore && (
        <div className={styles.loadMore}>
          <button
            className={styles.loadMoreButton}
            onClick={handleLoadMore}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ValueListing;
