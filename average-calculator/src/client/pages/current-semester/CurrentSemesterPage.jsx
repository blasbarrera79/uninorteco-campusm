import React from "react";
import { TabRouter } from "./sections/TabRouter";
import { usePageToolbar } from "../../hooks/usePageToolbar";
import { TabLayout } from "../../components/TabLayout";
import { defaultFinalGradeHowMuchTabs } from "../common/utils";
import { useTabLayout } from "../../components/TabLayout/useTabLayout";

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
  },
};

const CurrentSemesterPage = (props) => {
  const { classes } = props;
  const { onIndexChange, tabLabels, tabLayoutValue } = useTabLayout({
    tabs: defaultFinalGradeHowMuchTabs,
  });

  usePageToolbar();

  return (
    <div style={styles.page}>
      <TabLayout
        index={tabLayoutValue.index}
        tabs={tabLabels}
        onIndexChange={onIndexChange}>
        <TabRouter index={tabLayoutValue.index} />
      </TabLayout>
    </div>
  );
};

CurrentSemesterPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CurrentSemesterPage);
