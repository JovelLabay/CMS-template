import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { sha512 } from 'js-sha512';
import axios from 'axios';
import moment from 'moment';

const kpx_api_key = process.env.KPX_API_KEY;
const kpx_api_url = process.env.KPX_API_URL;
const MODULE_ID = 6;
const prisma = new PrismaClient();

// =========================== ZONES - STORE/UPDATE ===========================
const storeZones = async (data: any) => {
  try {
    let zonesData = data;
    let arrKPXZoneIDs = [];
    for (let i = 0; i < zonesData.length; i++) {
      let objZonesData = {
        kpx_zone_id: zonesData[i].zoneId,
        name: zonesData[i].name,
        code: zonesData[i].code,
      };
      arrKPXZoneIDs.push(zonesData[i].zoneId);

      // If already exists on zones table, update;
      // Else, insert
      await prisma.zones
        .findUnique({ where: { kpx_zone_id: zonesData[i].zoneId } })
        .then(async (result) => {
          if (result === null) {
            await prisma.zones.create({ data: { ...objZonesData } });
          } else {
            await prisma.zones.update({
              where: { kpx_zone_id: zonesData[i].zoneId },
              data: { ...objZonesData },
            });
          }
        });
    }

    // for deletion (zones table)
    await prisma.zones.deleteMany({
      where: {
        kpx_zone_id: {
          notIn: arrKPXZoneIDs,
        },
      },
    });
    return {
      success: true,
    };
  } catch (error: any) {
    console.log(error.message);
    return {
      success: false,
      message: error.message,
    };
  }
};

// =========================== REGIONS - STORE/UPDATE ===========================
const storeRegions = async (data: any) => {
  try {
    let regionsData = data;
    let arrKPXRegionIDs = [];
    for (let i = 0; i < regionsData.length; i++) {
      let objRegionsData = {
        kpx_region_id: regionsData[i].regionId,
        name: regionsData[i].name,
        code: regionsData[i].code,
        kpx_zone_id: regionsData[i].zoneId,
      };
      arrKPXRegionIDs.push(regionsData[i].regionId);

      // If already exists on regions table, update;
      // Else, insert
      await prisma.regions
        .findUnique({ where: { kpx_region_id: regionsData[i].regionId } })
        .then(async (result) => {
          if (result === null) {
            await prisma.regions.create({ data: { ...objRegionsData } });
          } else {
            await prisma.regions.update({
              where: { kpx_region_id: regionsData[i].regionId },
              data: { ...objRegionsData },
            });
          }
        });
    }
    // for deletion (Regions table)
    await prisma.regions.deleteMany({
      where: {
        kpx_region_id: {
          notIn: arrKPXRegionIDs,
        },
      },
    });
    return {
      success: true,
    };
  } catch (error: any) {
    console.log(error.message);
    return {
      success: false,
      message: error.message,
    };
  }
};

// =========================== AREAS - STORE/UPDATE ===========================
const storeAreas = async (data: any) => {
  try {
    let areasData = data;
    let arrKPXAreaIDs = [];
    for (let i = 0; i < areasData.length; i++) {
      let objAreasData = {
        kpx_area_id: areasData[i].areaId,
        name: areasData[i].name,
        code: areasData[i].code,
        kpx_region_id: areasData[i].regionId,
      };
      arrKPXAreaIDs.push(areasData[i].areaId);

      // If already exists on areas table, update;
      // Else, insert
      await prisma.areas
        .findUnique({ where: { kpx_area_id: areasData[i].areaId } })
        .then(async (result) => {
          if (result === null) {
            await prisma.areas.create({ data: { ...objAreasData } });
          } else {
            await prisma.areas.update({
              where: { kpx_area_id: areasData[i].areaId },
              data: { ...objAreasData },
            });
          }
        });
    }
    // for deletion (Regions table)
    await prisma.areas.deleteMany({
      where: {
        kpx_area_id: {
          notIn: arrKPXAreaIDs,
        },
      },
    });
    return {
      success: true,
    };
  } catch (error: any) {
    console.log(error.message);
    return {
      success: false,
      message: error.message,
    };
  }
};

// =========================== BRANCHES - STORE/UPDATE ===========================
const storeBranches = async (data: any) => {
  try {
    let branchData = data;
    let arrKPXids = [];
    for (let i = 0; i < branchData.length; i++) {
      let operatinghHrs = `${branchData[i].timeFrom} - ${branchData[i].timeTo}`;
      if (branchData[i].is24Hours == true) {
        operatinghHrs = '24 hours';
      }
      let objBranchesData = {
        kpx_branch_id: branchData[i].branchId,
        kpx_area_id: branchData[i].areaId,
        code: branchData[i].code,
        branch_name: branchData[i].name,
        branch_address: branchData[i].fullAddress,
        type: branchData[i].branchType,
        mac_ip_address: branchData[i].ipAddress,
        operating_hrs: operatinghHrs,
        status: branchData[i].status,
        processing_branch: branchData[i].processingBranchId,
        cellphone_num: branchData[i].cellphoneNumber,
        telephone_num: branchData[i].telephoneNumber,
        email: branchData[i].email,
        or_series_num: '',
        tin_num: branchData[i].tinNumber,
      };
      arrKPXids.push(branchData[i].branchId);

      // If already exists on branches table, update;
      // Else, insert
      await prisma.branches
        .findUnique({ where: { kpx_branch_id: branchData[i].branchId } })
        .then(async (result) => {
          if (result === null) {
            await prisma.branches.create({ data: { ...objBranchesData } });
          } else {
            await prisma.branches.update({
              where: { kpx_branch_id: branchData[i].branchId },
              data: { ...objBranchesData },
            });
          }
        });
    }

    // for deletion (branches table)
    await prisma.branches.deleteMany({
      where: {
        kpx_branch_id: {
          notIn: arrKPXids,
        },
      },
    });
    return {
      success: true,
    };
  } catch (error: any) {
    console.log(error.message);
    return {
      success: false,
      message: error.message,
    };
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Generate signature
    const key = `${kpx_api_key}|{}|{}`;
    // const hashValue = crypto.createHash('sha512').update(key).digest('hex');
    const hashValue = sha512.update(key).hex();

    const headerOpts = {
      'x-api-key': kpx_api_key,
      'x-api-signature': hashValue,
    };

    let endpoints = [
      `${kpx_api_url}/api/1.0/external/zones`,
      `${kpx_api_url}/api/1.0/external/regions`,
      `${kpx_api_url}/api/1.0/external/areas`,
      `${kpx_api_url}/api/1.0/external/branches`,
    ];

    // Return our response in the allData variable as an array
    Promise.all(
      endpoints.map((endpoint) => axios.get(endpoint, { headers: headerOpts }))
    )
      .then(
        axios.spread(async (...allData) => {
          let zone = await storeZones(allData[0].data.data);
          if (!zone.success) {
            await prisma.sync_Reports.create({
              data: {
                module_id: MODULE_ID,
                status: 'FAILED',
              },
            });
            return res.status(500).send({ message: zone.message });
          }

          let region = await storeRegions(allData[1].data.data);
          if (!region.success) {
            await prisma.sync_Reports.create({
              data: {
                module_id: MODULE_ID,
                status: 'FAILED',
              },
            });
            return res.status(500).send({ message: region.message });
          }

          let area = await storeAreas(allData[2].data.data);
          if (!area.success) {
            await prisma.sync_Reports.create({
              data: {
                module_id: MODULE_ID,
                status: 'FAILED',
              },
            });
            return res.status(500).send({ message: area.message });
          }

          let branch = await storeBranches(allData[3].data.data);
          if (!branch.success) {
            await prisma.sync_Reports.create({
              data: {
                module_id: MODULE_ID,
                status: 'FAILED',
              },
            });
            return res.status(500).send({ message: branch.message });
          }

          // Logs.create({
          //   module_id: MODULE_ID,
          //   message: 'Synched Branches data from KPX',
          //   user_id: 397
          // })

          await prisma.sync_Reports.create({
            data: {
              module_id: MODULE_ID,
              status: 'SUCCESSFUL',
            },
          });
          res.json({
            success: true,
            dateTimeSync: moment(new Date()).format('MM-DD-YYYY hh:mm A'),
          });
        })
      )
      .catch(async function (err) {
        await prisma.sync_Reports.create({
          data: {
            module_id: MODULE_ID,
            status: 'FAILED',
          },
        });
        console.log(err.message);
        res.status(500).send(err);
      });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
}
