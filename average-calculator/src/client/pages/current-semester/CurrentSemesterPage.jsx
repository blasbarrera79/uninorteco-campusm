import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TabRouter } from "./sections/TabRouter";
import { usePageToolbar } from "../../hooks/usePageToolbar";
import { TabLayout } from "../../components/TabLayout";
import { defaultFinalGradeHowMuchTabs } from "../common/utils";
import { useTabLayout } from "../../components/TabLayout/useTabLayout";

const useStyles = makeStyles({
  page: {
    display: "flex",
    justifyContent: "center",
  },
});

export default function CurrentSemesterPage(){
  const classes = useStyles();
  const { onIndexChange, tabLabels, tabLayoutValue } = useTabLayout({
    tabs: defaultFinalGradeHowMuchTabs,
  });

  usePageToolbar();

  return (
    <div className={classes.page}>
      <TabLayout
        index={tabLayoutValue.index}
        tabs={tabLabels}
        onIndexChange={onIndexChange}>
        <TabRouter index={tabLayoutValue.index} />
      </TabLayout>
    </div>
  );
}
