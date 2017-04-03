SIMCONNECT_RECV_SIMOBJECT_DATA *pObjData =(SIMCONNECT_RECV_SIMOBJECT_DATA*)pData;
DWORD ObjectID = pObjData->dwObjectID;
switch(pObjData->dwRequestID)
{
case REQUEST_INIT_POSITION :
// this is the answer to the initial request for user position
{DATA_ACFT_PARAM *pS = (DATA_ACFT_PARAM*)&pObjData->dwData;
printf("\n-> Position : avion (%d) Lat=%.4f Lon=%.4f Alt=%.f Hdg=%.f Knts=%.f", 
ObjectID, pS->latitude, pS->longitude, pS->altitude, pS->heading, pS->airspeed);
}
break; 