import { Typography } from "neetoui";

const NoData = ({ title }) => (
  <div className="flex h-screen items-center justify-center">
    <Typography style="h1" weight="bold">
      {title}
    </Typography>
  </div>
);

export default NoData;
