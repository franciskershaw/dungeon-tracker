import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

const CampaignsHomePage = () => {
  const [campaigns, setCampaigns] = useState(null)

  const { user } = useSelector((state) => state.auth);

  // need to get all of the user's campaign details into state
  useEffect(() => {

  },[])

  return (
    <div>
      <h2>
        I am the Campaign page were you can see your campaigns and join/create
        new ones
      </h2>
    </div>
  );
};

export default CampaignsHomePage;
