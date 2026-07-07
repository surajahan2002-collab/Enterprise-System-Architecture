"""
Architecture: Distributed Data Processing (Big Data)
Domain: DDPM Enterprise Telemetry & Risk Analysis
Framework: Apache Spark (PySpark)
Objective: Processing Terabytes of historical project data utilizing an In-Memory DAG engine.
"""

import logging
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, avg, count, when, round

# 1. Enterprise Logging Configuration
logging.basicConfig(level=logging.INFO, format='%(asctime)s [SPARK-NODE] %(message)s')
logger = logging.getLogger(__name__)

class BigDataTelemetryProcessor:
    def __init__(self):
        # 2. Initializing the Distributed Compute Cluster
        logger.info("Initializing Apache Spark Session...")
        self.spark = SparkSession.builder \
            .appName("DDPM_Massive_Telemetry_Aggregation") \
            .master("local[*]") \
            .config("spark.sql.shuffle.partitions", "200") \
            .config("spark.memory.fraction", "0.8") \
            .getOrCreate()

    def execute_pipeline(self, hdfs_input_path: str, datalake_output_path: str):
        try:
            logger.info(f"Ingesting raw telemetry from HDFS: {hdfs_input_path}")
            
            # 3. Data Ingestion: Reading massive datasets (JSON/CSV/Parquet) from Hadoop
            # DataFrames in Spark are lazily evaluated and distributed across the cluster nodes.
            raw_data_df = self.spark.read.parquet(hdfs_input_path)

            logger.info("Executing distributed transformations (DAG mapping)...")
            
            # 4. Distributed Transformations (Map & Reduce Operations)
            # Calculating the risk threshold and average velocity across millions of projects
            analytics_df = raw_data_df \
                .filter(col("status") != "DRAFT") \
                .groupBy("department_id") \
                .agg(
                    count("project_id").alias("total_projects"),
                    round(avg("completion_time_days"), 2).alias("avg_delivery_time"),
                    round(avg("analytics_score"), 2).alias("mean_health_score"),
                    # Identifying high-risk projects efficiently across nodes
                    count(when(col("analytics_score") < 40, True)).alias("critical_risk_count")
                )

            logger.info(f"Persisting aggregated insights to Data Lake: {datalake_output_path}")
            
            # 5. Action: Triggering the DAG execution and writing to a distributed storage system
            analytics_df.write \
                .mode("overwrite") \
                .parquet(datalake_output_path)

            logger.info("Pipeline Execution Terminated Successfully.")

        except Exception as e:
            logger.error(f"Critical Cluster Fault: {str(e)}")
            raise
        finally:
            # Gracefully terminating the cluster resources
            self.spark.stop()

# ============================================================================
# 🚀 EXECUTION ENTRY POINT
# ============================================================================
if __name__ == "__main__":
    processor = BigDataTelemetryProcessor()
    # In production, these paths point to Amazon S3 or Hadoop Distributed File System (HDFS)
    processor.execute_pipeline(
        hdfs_input_path="hdfs://namenode:8020/data/raw/ddpm_telemetry/",
        datalake_output_path="s3a://ddpm-enterprise-datalake/processed/department_analytics/"
    )
