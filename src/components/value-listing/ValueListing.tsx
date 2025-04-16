"use client";

import { useEffect, useState, useCallback } from "react";
import FeaturedValue from "../featured-value/FeaturedValue";
import ProposeValueButton from "../propose-value-button/ProposeValueButton";
import SearchControls from "../search-controls/SearchControls";
import ValueCard from "../value-card/ValueCard";
import styles from "./value-listing.module.scss";
import Carousel from "../carousel/Carousel";
import { useAccount } from "wagmi";
import { useGetValuesListing } from "@/hooks/useGetValuesListing";
import { formatEther } from "viem";

const ValueListing = () => {
  const { address, isConnected } = useAccount();
  const { getValuesData } = useGetValuesListing();

  const [featuredValues, setFeaturedValues] = useState([]);
  const [values, setValues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [sortBy, setSortBy] = useState("stake");
  const [showOnlyVoted, setShowOnlyVoted] = useState(false);

  const pageSize = 5;

  const fetchValues = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getValuesData(
        currentPage,
        pageSize,
        sortBy,
        showOnlyVoted,
        isConnected ? address : null
      );

      if (!data?.values) {
        console.error("No values returned from getValuesData");
        return;
      }

      if (currentPage === 1) {
        setValues(data.values);
      } else {
        setValues((prev) => {
          const newValues = data.values.filter(
            (newValue) =>
              !prev.some((existingValue) => existingValue.id === newValue.id)
          );
          return [...prev, ...newValues];
        });
      }

      setHasMore(currentPage < data.totalPages);
    } catch (error) {
      console.error("Error fetching values:", error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, sortBy, showOnlyVoted, address, isConnected, getValuesData]);

  useEffect(() => {
    fetchValues();
  }, [fetchValues]);

  useEffect(() => {
    if (!values || !values.length) {
      setFeaturedValues([]);
      return;
    }

    setFeaturedValues(values.slice(0, 5));
  }, [values]);

  const handleLoadMore = () => {
    if (!isLoading) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
    setValues([]);
  };

  const handleFilterChange = (checked) => {
    setShowOnlyVoted(checked);
    setCurrentPage(1);
    setValues([]);
  };

  const handleProposeSuccess = useCallback(() => {
    setValues([]);

    if (currentPage === 1 && sortBy === "newest" && showOnlyVoted) {
      fetchValues();
      return;
    }
    setCurrentPage(1);
    setSortBy("newest");
    setShowOnlyVoted(true);
  }, [currentPage, sortBy, showOnlyVoted, fetchValues]);

  const showLoadMore = values.length > 0 && hasMore;

  const nonFeaturedValues = values.filter(
    (value) => !featuredValues.find((featured) => featured.id === value.id)
  );

  return (
    <div className={styles.listing}>
      <div className={styles.toolbar}>
        <SearchControls
          sortValue={sortBy}
          setSortValue={handleSortChange}
          involved={showOnlyVoted}
          setInvolved={handleFilterChange}
        />
        <div>
          <ProposeValueButton onSuccess={handleProposeSuccess} />
        </div>
      </div>
      <div className={styles.featuredValues}>
        {featuredValues.map((value, index) => (
          <FeaturedValue
            key={value.id}
            valueId={value.id}
            vaultId={value.vaultId}
            counterVaultId={value.counterVaultId}
            title={value.valueName}
            description={value.description}
            totalAmount={Number(formatEther(value.totalStaked)).toFixed(3)}
            totalAmountFor={Number(formatEther(value.totalStakedFor)).toFixed(
              3
            )}
            totalAmountAgainst={Number(
              formatEther(value.totalStakedAgainst)
            ).toFixed(3)}
            totalUsers={value.totalUsers}
          />
        ))}
      </div>
      <Carousel className={styles.featuredValuesMobile}>
        {featuredValues.map((value, index) => (
          <div key={value.id} className={styles.carouselItem}>
            <FeaturedValue
              valueId={value.id}
              vaultId={value.vaultId}
              counterVaultId={value.counterVaultId}
              title={value.valueName}
              description={value.description}
              totalAmount={Number(formatEther(value.totalStaked)).toFixed(3)}
              totalAmountFor={Number(formatEther(value.totalStakedFor)).toFixed(
                3
              )}
              totalAmountAgainst={Number(
                formatEther(value.totalStakedAgainst)
              ).toFixed(3)}
              totalUsers={value.totalUsers}
            />
          </div>
        ))}
      </Carousel>
      <div className={styles.values}>
        {nonFeaturedValues.map((value) => (
          <ValueCard
            key={value.id}
            valueId={value.id}
            vaultId={value.vaultId}
            counterVaultId={value.counterVaultId}
            title={value.valueName}
            description={value.description}
            totalAmount={Number(formatEther(value.totalStaked)).toFixed(3)}
            totalAmountFor={Number(formatEther(value.totalStakedFor)).toFixed(
              3
            )}
            totalAmountAgainst={Number(
              formatEther(value.totalStakedAgainst)
            ).toFixed(3)}
            totalUsers={value.totalUsers}
          />
        ))}
      </div>
      {(showLoadMore || isLoading) && (
        <div className={styles.loadMore}>
          {isLoading ? (
            <div className={styles.spinner}>
              <span className={styles.loadingSpinner}></span>
            </div>
          ) : (
            <button className={styles.loadMoreButton} onClick={handleLoadMore}>
              Load More
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ValueListing;
