export const fetchCampaign = async (token, campaignId) => {
  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${token}`);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  try {
		const response = await fetch(`/api/campaigns/${campaignId}`, requestOptions)
		if (response.status === 200) {
			let data = response.json()
			return data;
		}
  } catch (err) {
		console.log(err)
		throw new Error(err)
	}
};
