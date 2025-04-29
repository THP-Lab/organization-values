"use client";

import { useEffect, useState, useCallback } from "react";
import FeaturedValue from "../featured-value/FeaturedValue";
import ProposeValueButton from "../propose-value-button/ProposeValueButton";
import SearchControls from "../search-controls/SearchControls";
import ValueCard from "../value-card/ValueCard";
import styles from "./value-listing.module.scss";
import Carousel from "../carousel/Carousel";
import { usePrivyAdapter } from "@/hooks/usePrivyAuth";
import { useGetValuesListing } from "@/hooks/useGetValuesListing";
import { formatEther } from "viem";

interface Value {
  id: string | number;
  valueName: string;
  description: string;
  vaultId: string | number;
  counterVaultId: string | number;
  totalStaked: string;
  totalStakedFor: string;
  totalStakedAgainst: string;
  totalUsers: number;
}

// Définir un type pour les options de tri disponibles
type SortOption = "mostStaked" | "newest" | "alphabetical";

const ValueListing = () => {
  const { useAccount } = usePrivyAdapter();
  const { address, isConnected } = useAccount();
  const { getValuesData } = useGetValuesListing();

  const [featuredValues, setFeaturedValues] = useState<Value[]>([]);
  const [values, setValues] = useState<Value[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>("mostStaked");
  const [showOnlyVoted, setShowOnlyVoted] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const pageSize = 5;

  const fetchValues = async () => {
    setIsLoading(true);
    try {
      const { values: fetchedValues, currentPage: page, totalPages } = await getValuesData(
        currentPage,
        pageSize,
        sortBy,
        showOnlyVoted,
        null
      );

      setValues(fetchedValues || []);
      setCurrentPage(page);
      setTotalPages(totalPages);

      if (currentPage === 1) {
        setFeaturedValues(values.slice(0, 5));
      } else {
        setFeaturedValues((prev) => {
          const newValues = values.filter(
            (newValue) =>
              !prev.some((existingValue) => existingValue.id === newValue.id)
          );
          return [...prev, ...newValues];
        });
      }

      setHasMore(currentPage < totalPages);
    } catch (error: unknown) {
      console.error("Error fetching values:", error);
      setValues([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchValues();
  }, [fetchValues]);

  const handleLoadMore = () => {
    if (!isLoading) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleSortChange = (newSortBy: SortOption) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
    setValues([]);
    fetchValues();
  };

  const handleSortChangeWrapper = (value: string) => {
    if (value === "mostStaked" || value === "newest" || value === "alphabetical") {
      handleSortChange(value as SortOption);
    } else {
      console.error(`Invalid sort option: ${value}`);
    }
  };

  const handleFilterChange = (checked: boolean) => {
    setShowOnlyVoted(checked);
    setCurrentPage(1);
    setValues([]);
    fetchValues();
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
          setSortValue={handleSortChangeWrapper}
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
            totalAmount={Number(formatEther(BigInt(value.totalStaked))).toFixed(3)}
            totalAmountFor={Number(formatEther(BigInt(value.totalStakedFor))).toFixed(3)}
            totalAmountAgainst={Number(formatEther(BigInt(value.totalStakedAgainst))).toFixed(3)}
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
              totalAmount={Number(formatEther(BigInt(value.totalStaked))).toFixed(3)}
              totalAmountFor={Number(formatEther(BigInt(value.totalStakedFor))).toFixed(3)}
              totalAmountAgainst={Number(formatEther(BigInt(value.totalStakedAgainst))).toFixed(3)}
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
            totalAmount={Number(formatEther(BigInt(value.totalStaked))).toFixed(3)}
            totalAmountFor={Number(formatEther(BigInt(value.totalStakedFor))).toFixed(3)}
            totalAmountAgainst={Number(formatEther(BigInt(value.totalStakedAgainst))).toFixed(3)}
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
