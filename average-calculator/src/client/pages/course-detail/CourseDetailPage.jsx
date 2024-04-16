import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { TabRouter } from "./sections/TabRouter";
import { useTabLayout } from "../../components/TabLayout/useTabLayout";
import { TabLayout } from "../../components/TabLayout";
import { useCourse } from "./hooks/useCourse";
import { defaultFinalGradeHowMuchTabs } from "../common/utils";
import { usePageToolbar } from "../../hooks/usePageToolbar";

const styles = () => ({
  page: {
    display: "flex",
    justifyContent: "center",
  },
});

const CourseDetailPage = ({ classes }) => {
  const { courseId } = useParams();
  const { course } = useCourse({ courseId });
  const { onIndexChange, tabLabels, tabLayoutValue } = useTabLayout({
    tabs: defaultFinalGradeHowMuchTabs,
  });

  useEffect(() => {
    if (course) {
      setPageTitle(course.name);
    } else {
      setPageTitle("Cargando Curso");
    }
  }, [course, setPageTitle]);

  usePageToolbar();

  return (
    <div className={classes.page}>
      {course && (
        <TabLayout
          index={tabLayoutValue.index}
          tabs={tabLabels}
          onIndexChange={onIndexChange}>
          <TabRouter
            index={tabLayoutValue.index}
            course={course}
          />
        </TabLayout>
      )}
    </div>
  );
};

CourseDetailPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CourseDetailPage);
