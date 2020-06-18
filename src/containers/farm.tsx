import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { FarmState } from "../store/reducers/farmReducer";
import { editOwnerData } from '../store/actions/farmActions';

const Farm = () => {
  const getStateFarm = (state:any) => state.farm;
  const dispatch = useDispatch();

  const ownerData = useSelector<FarmState, FarmState["ownerData"]>(getStateFarm)
  const farmName = useSelector<FarmState, FarmState["farmName"]>(getStateFarm)
  const districtNumber = useSelector<FarmState, FarmState["districtNumber"]>(getStateFarm)
  const plEkoNumber = useSelector<FarmState, FarmState["plEkoNumber"]>(getStateFarm)
  const ekoPackages = useSelector<FarmState, FarmState["ekoPackages"]>(getStateFarm)
  const agroEnvPackages = useSelector<FarmState, FarmState["agroEnvPackages"]>(getStateFarm)

  const onEditOwnerData = (data: Partial<FarmState["ownerData"]>) => {
    dispatch(editOwnerData(data));
  }

  return (
    <div>
    </div>
  )
}

export default Farm
